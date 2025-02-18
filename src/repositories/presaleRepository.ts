import { RowDataPacket } from "mysql2/promise";
import axios from 'axios';

import db from "../config/db";
import EstatePresale from "../Dto/DtoPresale/EstatePresaleDto";
import DeletePresale from "../Dto/DtoPresale/deletePresaleDto";
import DetailsPresale from "../Dto/DtoPresale/detailsPresaleDto";
import GetPresale from "../Dto/DtoPresale/getPresaleDto";
import Presale from "../Dto/DtoPresale/presaleDto";
import UpdatePresale from "../Dto/DtoPresale/updatePresaleDto";
import dotenv from 'dotenv';

dotenv.config();

class PresaleRepository{

// Registrar una preventa
    static async registerPresale(presale: Presale, details: DetailsPresale[]): Promise<number> {
        const connection = await db.getConnection(); // Obtener conexión para la transacción
        try {
            await connection.beginTransaction();
            
            // Paso 1: Insertar la preventa
            const presaleSql = 'INSERT INTO preventas (id_cliente, id_colaborador) VALUES (?, ?)';
            const presaleValues = [presale.id_cliente, presale.id_colaborador];
            console.log('ID_COLABORADOR: ',presale.id_colaborador);

            const [presaleResult]: any = await connection.execute(presaleSql, presaleValues);
            const presaleId = presaleResult.insertId;

            // Paso 2: Insertar los detalles
            const detailSql = `
                INSERT INTO detalle_preventa (id_preventa, id_producto, cantidad, subtotal) 
                VALUES (?, ?, ?, ?)`;

            for (const detail of details) {
                const productResponse = await axios.get(`${process.env.PRODUCT_SERVICE_URL}${detail.id_producto}`);
                const productData = productResponse.data[0];
                console.log('PRODUCT_DATA', productData); 
                if (!productData) {
                    throw new Error(`No se encontró información para el producto con ID ${detail.id_producto}`);
                }

                // Obtener el precio y la cantidad en stock
                const price = parseFloat(productData.precio);
                const stock = productData.cantidad_ingreso;
                console.log('DATAPRODUCTooooooooooo', stock);

                if (stock < detail.cantidad) {
                    throw new Error(`Stock insuficiente para el producto ${detail.id_producto}`);
                }

                const subtotal = price * detail.cantidad;

                // Insertar el detalle en la base de datos
                const detailValues = [presaleId, detail.id_producto, detail.cantidad, subtotal];
                await connection.execute(detailSql, detailValues);
                let cantidad = stock - detail.cantidad
                console.log('CANTIDADDDDD: ', cantidad);
                
                console.log('CANTIDAD:', detail.cantidad);
                
                  // Actualizar la cantidad en el microservicio de productos
                await axios.put(`${process.env.PRODUCT_SERVICE_URL_ACTUALIZAR_CANTIDAD}${detail.id_producto}/${cantidad}`);
            }

            // Paso 3: Calcular el total de la preventa
            const totalSql = `
                UPDATE preventas 
                SET total = (SELECT SUM(subtotal) FROM detalle_preventa WHERE id_preventa = ?) 
                WHERE id_preventa = ?`;
            await connection.execute(totalSql, [presaleId, presaleId]);

            await connection.commit();
            return presaleId; // Devuelve el ID de la preventa creada
        } catch (error) {
            await connection.rollback();
            throw error; // Re-lanzar el error para manejarlo
        } finally {
            connection.release();
        }
    }

// Obtener todos las preventas como administrador
    static async getAll() {
        const sql = `SELECT * FROM preventas WHERE estado = 'Pendiente'`;
        const [rows] = await db.query<RowDataPacket[]>(sql);
        return rows as Presale[];
    }

// Obtener las preventas propias 
    static async getAllColaborador(userId: number) {
        const sql = `SELECT * FROM preventas WHERE id_colaborador = ? AND estado = 'Pendiente'`;
        const values = [userId]
        const [rows] = await db.query(sql,values);
        return rows as Presale[];
    }

// Obtener preventa por id como Administrador
    static async getById(getPresale : GetPresale){
        const sql = `SELECT * FROM preventas WHERE id_preventa = ? AND estado = 'Pendiente'`;
        const values = [getPresale.id_presale]; 
        const [rows] = await db.execute(sql, values);      
        return rows as Presale[];
    }

// Obtener preventa por ID como colaborador
    static async getByIdColaborador(getPresale : GetPresale, id_colaborador: number){
        const sql = `SELECT * FROM preventas WHERE id_preventa = ? AND id_colaborador = ? AND estado = 'Pendiente'`;
        const values = [getPresale.id_presale, id_colaborador]; 
        const [rows] = await db.execute(sql, values);      
        return rows as Presale[];
    }

// Eliminar preventa, administrador
    static async delete(deletePresale: DeletePresale){
        const sql = 'DELETE FROM preventas WHERE id_preventa = ?';
        const values = [deletePresale.id_presale];
        const [result]: any = await db.execute(sql, values);
        return result.affectedRows;
    }

    static async cancel(cancelPresale: EstatePresale, id_colaborador: number){
        const sql = 'UPDATE preventas SET estado = "Cancelada" WHERE id_preventa = ? AND id_colaborador = ?';
        const values = [cancelPresale.id_presale, id_colaborador];
        const [result]: any = await db.execute(sql, values);
        return result.affectedRows; 
    }

    static async confirm(id_presale: string, returnedProductos: number[]){
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Validar que la preventa exista y esté pendiente
            const [preventaRows]: any = await connection.execute(
                `SELECT estado FROM preventas WHERE id_preventa = ?`,
                [id_presale]
            );
            const preventa = preventaRows[0];
            if (!preventa || preventa.estado !== 'Pendiente') {
                await connection.rollback();
                return false;
            }

            // Actualizar el estado de los productos devueltos
            if (returnedProductos && returnedProductos.length > 0) {
                const placeholders = returnedProductos.map(() => '?').join(',');
                await connection.execute(
                    `
                    UPDATE detalle_preventa 
                    SET estado = 'devuelto' 
                    WHERE id_preventa = ? AND id_producto IN (${placeholders})`,
                    [id_presale, ...returnedProductos]
                );
            }

            // Confirmar la preventa
            const [updateResult]: any = await connection.execute(
                `
                UPDATE preventas 
                SET estado = 'Confirmada', fecha_confirmacion = NOW() 
                WHERE id_preventa = ?`,
                [id_presale]
            );

            if (updateResult.affectedRows === 0) {
                await connection.rollback();
                return false;
            }

            await connection.commit(); // Confirmar los cambios
            return true;
        } catch (error) {
            await connection.rollback(); // Revertir los cambios en caso de error
            throw error;
        } finally {
            connection.release(); // Liberar la conexión
        }
    }
    // para editar un producto en la preventa 
    static async update(updatePresale : UpdatePresale, id_colaborador: number){
        // Verificar si id_detalle existe
        if (!updatePresale.id_preventa) {
            throw new Error("id_preventa es undefined o null");
        }
        const [detalle] = await db.execute<RowDataPacket[]>(`
                SELECT 1 FROM detalle_preventa dp 
                INNER JOIN preventas p ON dp.id_preventa = p.id_preventa  
                WHERE dp.id_preventa = ? AND p.id_colaborador = ? AND dp.id_producto = ?
            `, [updatePresale.id_preventa, id_colaborador, updatePresale.id_producto]);
        if (detalle.length === 0) {
            throw new Error('Detalle de preventa no encontrado');
        }

        const sql = 'UPDATE detalle_preventa SET id_producto = ?, cantidad = ? WHERE id_preventa = ? and id_producto = ?';
        const values = [updatePresale.id_producto, updatePresale.cantidad, updatePresale.id_preventa, updatePresale.id_producto];
        return db.execute(sql,values);
    }

    // para agregar nuevos productos a la preventa
    static async addProductsPresale(addProducts: DetailsPresale[]){
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
             // Paso 1: Insertar los productos
            const productsSql = `INSERT INTO detalle_preventa (id_preventa, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)`;
            for (const detail of addProducts) {
                // Obtener el precio del producto desde el microservicio de productos
                const productResponse = await axios.get(`${process.env.PRODUCT_SERVICE_URL}${detail.id_producto}`);
                const productData = productResponse.data[0];
                console.log('RESPUESTA COMPLETA', productData.data);

                const price = parseFloat(productData.precio);
                console.log('PRICE:', price);
                
                if (!price) {
                    throw new Error(`Precio no encontrado para el producto ${detail.id_producto}`);
                }

                // Calcular el subtotal
                const subtotal = price * detail.cantidad;

                // Insertar el detalle en la base de datos
                const productsValues = [detail.id_preventa, detail.id_producto, detail.cantidad, subtotal];
                await connection.execute(productsSql, productsValues);
            }

            // Paso 3: Calcular el total de la preventa
            const idPreventa = addProducts[0].id_preventa;
            const totalSql = `
                UPDATE preventas 
                SET total = (SELECT SUM(subtotal) FROM detalle_preventa WHERE id_preventa = ?) 
                WHERE id_preventa = ?`;
            await connection.execute(totalSql, [idPreventa, idPreventa]);

            await connection.commit();
            return;
        } catch (error) {
            await connection.rollback();
            throw error; 
        } finally {
            connection.release();
        }
    }

// para obtener toda la informacion de una preventa como Administrador
    static async getIdsPresale(id_presale: string) {
        const sql = `
            SELECT 
                p.id_preventa, 
                p.id_cliente, 
                p.id_colaborador, 
                p.total, 
                p.estado, 
                dp.id_producto, 
                dp.cantidad, 
                dp.subtotal 
            FROM preventas p 
            INNER JOIN detalle_preventa dp 
            ON p.id_preventa = dp.id_preventa 
            WHERE p.id_preventa = ?`;
    
        const values = [id_presale];
        const [rows]: any = await db.execute(sql, values);
    
        if (!rows || rows.length === 0) {
            return null;
        }
    
        // Agrupar productos en el array 'detalle'
        const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
        const detalle = rows.map((row: any) => ({
            id_producto: row.id_producto,
            cantidad: row.cantidad,
            subtotal: row.subtotal,
        }));
    
        return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
    }

// Obtener detalle de una preventa como colaborador
    static async getIdsPresaleColaborador(id_presale: number, userId:number) {
        const sql = `
            SELECT 
                p.id_preventa, 
                p.id_cliente, 
                p.id_colaborador, 
                p.total, 
                p.estado, 
                dp.id_producto, 
                dp.cantidad, 
                dp.subtotal 
            FROM preventas p 
            INNER JOIN detalle_preventa dp 
            ON p.id_preventa = dp.id_preventa 
            WHERE p.id_preventa = ? AND p.id_colaborador = ?`;
    
        const values = [id_presale, userId];
        const [rows]: any = await db.execute(sql, values);
    
        if (!rows || rows.length === 0) {
            return null;
        }
    
        // Agrupar productos en el array 'detalle'
        const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
        const detalle = rows.map((row: any) => ({
            id_producto: row.id_producto,
            cantidad: row.cantidad,
            subtotal: row.subtotal,
        }));
    
        return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
    }
    
}



export default PresaleRepository;