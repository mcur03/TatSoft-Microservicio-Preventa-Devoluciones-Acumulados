import { RowDataPacket } from "mysql2/promise";
import db from "../config/db";
import CancelPresale from "../Dto/DtoPresale/cancelPresaleDto";
import DeletePresale from "../Dto/DtoPresale/deletePresaleDto";
import DetailsPresale from "../Dto/DtoPresale/detailsPresaleDto";
import GetPresale from "../Dto/DtoPresale/getPresaleDto";
import Presale from "../Dto/DtoPresale/presaleDto";
import UpdatePresale from "../Dto/DtoPresale/updatePresaleDto";

class PresaleRepository{
    static async createPresaleWithDetails(presale: Presale, details: DetailsPresale[]): Promise<number> {
        const connection = await db.getConnection(); // Obtener conexión para la transacción
        try {
            await connection.beginTransaction();
    
            // Paso 1: Insertar la preventa
            const presaleSql = 'INSERT INTO preventas (id_cliente, id_colaborador) VALUES (?, ?)';
            const presaleValues = [presale.id_cliente, presale.id_colaborador];
            const [presaleResult]: any = await connection.execute(presaleSql, presaleValues);
            const presaleId = presaleResult.insertId;
    
            // Paso 2: Insertar los detalles
            const detailSql = 'INSERT INTO detalle_preventa (id_preventa, id_producto, cantidad) VALUES (?, ?, ?, ?)';
            for (const detail of details) {
                const detailValues = [presaleId, detail.id_producto, detail.cantidad];
                await connection.execute(detailSql, detailValues);
            }
    
            // Paso 3: Actualizar el total en la preventa
            const totalSql = 'UPDATE preventas SET total = (SELECT SUM(subtotal) FROM detalle_preventa WHERE id_preventa = ?) WHERE id_preventa = ?';
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

    static async getAllPresales() {
        const sql = 'CALL GetAllPresales()';
        const [rows] = await db.query<RowDataPacket[][]>(sql);
        return rows[0];
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
}