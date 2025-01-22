import { RowDataPacket } from "mysql2/promise";
import axios from 'axios';

import db from "../config/db";
import CancelPresale from "../Dto/DtoPresale/cancelPresaleDto";
import DeletePresale from "../Dto/DtoPresale/deletePresaleDto";
import DetailsPresale from "../Dto/DtoPresale/detailsPresaleDto";
import GetPresale from "../Dto/DtoPresale/getPresaleDto";
import Presale from "../Dto/DtoPresale/presaleDto";
import UpdatePresale from "../Dto/DtoPresale/updatePresaleDto";
import dotenv from 'dotenv';

dotenv.config();
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL 

class PresaleRepository{


static async registerPresale(presale: Presale, details: DetailsPresale[]): Promise<number> {
    const connection = await db.getConnection(); // Obtener conexión para la transacción
    try {
        await connection.beginTransaction();

        // Paso 1: Insertar la preventa
        const presaleSql = 'INSERT INTO preventas (id_cliente, id_colaborador) VALUES (?, ?)';
        const presaleValues = [presale.id_cliente, presale.id_colaborador];
        const [presaleResult]: any = await connection.execute(presaleSql, presaleValues);
        const presaleId = presaleResult.insertId;

        // Paso 2: Insertar los detalles
        const detailSql = `
            INSERT INTO detalle_preventa (id_preventa, id_producto, cantidad, subtotal) 
            VALUES (?, ?, ?, ?)`;

        for (const detail of details) {
            // Obtener el precio del producto desde el microservicio de productos
            const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/${detail.id_producto}`);
            console.log('RESPUESTA COMPLETA', productResponse);
            
            console.log('RESPUESTAAXIOS', productResponse.data);
            
            const price = productResponse.data.precio;
            if (!price) {
                throw new Error(`Precio no encontrado para el producto ${detail.id_producto}`);
            }
            console.log('PRECIO.P', price);
            

            // Calcular el subtotal
            const subtotal = price * detail.cantidad;

            // Insertar el detalle en la base de datos
            const detailValues = [presaleId, detail.id_producto, detail.cantidad, subtotal];
            await connection.execute(detailSql, detailValues);
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


    static async getAll() {
        const sql = 'SELECT * FROM preventas';
        const [rows] = await db.query<RowDataPacket[]>(sql);
        return rows;
    }

    static async getById(getPresale : GetPresale){
        const sql = 'SELECT * FROM preventas WHERE id_preventa = ?';
        const values = [getPresale.id_presale]; 
        const [rows] = await db.execute(sql, values);      
        return [rows]
    }

    static async delete(deletePresale: DeletePresale){
        const sql = 'DELETE FROM prevetas WHERE id_preventa = ?';
        const values = [deletePresale.id_presale];
        const [result]: any = await db.execute(sql, values);
        return result.affectedRows; // Devuelve el número de filas afectadas.
    }

    static async cancel(cancelPresale: CancelPresale){
        const sql = 'UPDATE preventas SET estado = "Cancelada" WHERE id_preventa = ?';
        const values = [cancelPresale.id_presale];
        const [result]: any = await db.execute(sql, values);
        return result.affectedRows; 
    }
    static async update(updatePresale : UpdatePresale){
        const sql = 'UPDATE preventas SET id_producto = ?, cantidad = ? WHERE id_detalle = ?';
        const values = [updatePresale.id_producto, updatePresale.cantidad, updatePresale.id_detalle]
        return db.execute(sql,values);
    }

    // para obtener toda la informacion de una preventa  
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
            return null; // Preventa no encontrada
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