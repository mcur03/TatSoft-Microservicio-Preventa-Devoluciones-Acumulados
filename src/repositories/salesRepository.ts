import db from "../config/db";
import SalesDTO from "../Dto/DtoSales/salesDto";
import GetSale from "../Dto/DtoSales/getSaleDto";

class SalesRepository{
    // Obtener todos las ventas como administrador
    static async getAll(): Promise <SalesDTO[]> {
        const sql = `
        SELECT 
            p.id_preventa,
            p.fecha_confirmacion,
            p.id_colaborador,
            p.id_cliente,
            SUM(dp.subtotal) AS total_vendido
        FROM preventas p
        JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
        WHERE p.estado = 'Confirmada' 
        AND dp.estado = 'vendido'
        GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
        `;

        const [rows] = await db.execute(sql);
        return rows as SalesDTO[];
    }

// Obtener las ventas propias 
    static async getAllColaborador(userId: number): Promise<SalesDTO[]> {
        const sql = `
            
            SELECT 
                p.id_preventa,
                p.fecha_confirmacion,
                p.id_colaborador,
                p.id_cliente,
                SUM(dp.subtotal) AS total_vendido
            FROM preventas p
            JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
            WHERE p.estado = 'Confirmada' 
            AND dp.estado = 'vendido'
            AND p.id_colaborador = ?
            GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
        `;
        const values = [userId]
        const [rows] = await db.execute(sql,values);
        console.log('ROWS', rows);
        
        return rows as SalesDTO[];
    }

// Obtener el detalle de una venta como administrador
static async getSaleDetails(id_presale: string){
    const sql = `
            SELECT 
                p.id_preventa,
                p.fecha_confirmacion,
                p.id_colaborador,
                p.id_cliente,
                dp.id_producto,
                dp.cantidad
            FROM preventas p
            JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
            WHERE p.estado = 'Confirmada'
            AND dp.estado = 'vendido'
            AND p.id_preventa = ?;
        `;
        const values = [id_presale];

        const [rows]:any = await db.execute(sql, values);

        if (!rows || rows.length === 0) {
            return null; // Preventa no encontrada
        }

        const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
        const detalle = rows.map((row: any) => ({
            id_producto: row.id_producto,
            cantidad: row.cantidad,
            subtotal: row.subtotal,
        }));
    
        return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
        //return rows as SalesDTO[];
    }

// Obtener el datelle de una venta como colaborador
static async getSaleDetailsColaborador(id_presale: string, userId:string){
    const sql = `
            SELECT 
                p.id_preventa,
                p.fecha_confirmacion,
                p.id_colaborador,
                p.id_cliente,
                dp.id_producto,
                dp.cantidad
            FROM preventas p
            JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
            WHERE p.estado = 'Confirmada'
            AND dp.estado = 'vendido'
            AND p.id_preventa = ?
            AND p.id_colaborador = ?;
        `;
        const values = [id_presale, userId];

        const [rows]:any = await db.execute(sql, values);

        if (!rows || rows.length === 0) {
            return null; // Preventa no encontrada
        }

        const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
        const detalle = rows.map((row: any) => ({
            id_producto: row.id_producto,
            cantidad: row.cantidad,
            subtotal: row.subtotal,
        }));
    
        return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
        //return rows as SalesDTO[];
    }

// Obtener preventa por id como Administrador
static async getById(getSale : GetSale){
    const sql = 'SELECT * FROM preventas WHERE id_preventa = ? AND estado = "Confirmada"';
    const values = [getSale.id_presale]; 
    const [rows] = await db.execute(sql, values);      
    return rows as SalesDTO[];
}

// Obtener preventa por ID como colaborador
static async getByIdColaborador(getSale : GetSale, id_colaborador: number){
    const sql = 'SELECT * FROM preventas WHERE id_preventa = ? AND estado = "Confirmada" AND id_colaborador = ?';
    const values = [getSale.id_presale, id_colaborador]; 
    const [rows] = await db.execute(sql, values);      
    return rows as SalesDTO[];
}
}

export default SalesRepository;