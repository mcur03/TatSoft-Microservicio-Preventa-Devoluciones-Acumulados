import db from "../config/db";
import GetRefundDTO from "../Dto/DtoRefund/getRefundDto";
import RefundDTO from "../Dto/DtoRefund/refundDto";

class RefundRepository{
    // Obtener todos las devoluciones como administrador
    static async getAll(): Promise <RefundDTO[]> {
        const sql = `
        SELECT 
            p.id_preventa,
            p.fecha_confirmacion,
            p.id_colaborador,
            p.id_cliente,
            SUM(dp.subtotal) AS total_devuelto
        FROM preventas p
        JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
        WHERE p.estado = 'Confirmada' 
        AND dp.estado = 'devuelto'
        GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
        `;

        const [rows] = await db.execute(sql);
        return rows as RefundDTO[];
    }

// Obtener las devoluciones propias 
    static async getAllColaborador(userId: number): Promise<RefundDTO[]> {
        const sql = `
            
            SELECT 
                p.id_preventa,
                p.fecha_confirmacion,
                p.id_colaborador,
                p.id_cliente,
                SUM(dp.subtotal) AS total_devueltos
            FROM preventas p
            JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
            WHERE p.estado = 'Confirmada' 
            AND dp.estado = 'devuelto'
            AND p.id_colaborador = ?
            GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
        `;
        const values = [userId]
        const [rows] = await db.execute(sql,values);
        console.log('ROWS', rows);
        
        return rows as RefundDTO[];
    }

// Obtener el detalle de una devoculion como administrador
static async getRefundDetails(id_presale: string){
    const sql = `
            SELECT 
                p.id_preventa,
                p.fecha_confirmacion,
                p.id_colaborador,
                p.estado,
                p.id_cliente,
                dp.id_producto,
                dp.cantidad,
                dp.subtotal
            FROM preventas p
            JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
            WHERE p.estado = 'Confirmada'
            AND dp.estado = 'devuelto'
            AND p.id_preventa = ?;
        `;
        const values = [id_presale];

        const [rows]:any = await db.execute(sql, values);

        if (!rows || rows.length === 0) {
            return null; 
        }

        const totalSQL = `SELECT SUM(subtotal) AS total_devoluciones FROM detalle_preventa WHERE estado = 'devuelto' AND id_preventa = ?`;
        const [totalRows]: any = await db.execute(totalSQL, [id_presale]);
        const total = totalRows[0]?.total_devoluciones || 0; 
        
        console.log('TOTALL:', total);
        

        const { id_preventa, id_cliente, id_colaborador, estado } = rows[0];
        const detalle = rows.map((row: any) => ({
            id_producto: row.id_producto,
            cantidad: row.cantidad,
            subtotal: row.subtotal,
        }));
        
        console.log('DETALLEEE:', detalle);
    
        return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
    }

// Obtener el datelle de una devolucion como colaborador
static async getRefundDetailsColaborador(id_presale: string, userId:string){
    const sql = `
        SELECT 
            p.id_preventa,
            p.fecha_confirmacion,
            p.id_colaborador,
            p.estado,
            p.id_cliente,
            dp.id_producto,
            dp.cantidad,
            dp.subtotal
        FROM preventas p
        JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
        WHERE p.estado = 'Confirmada'
        AND dp.estado = 'devuelto'
        AND p.id_preventa = ?
        AND p.id_colaborador = ?;
    `;
    const values = [id_presale, userId];

    const [rows]: any = await db.execute(sql, values);

    if (!rows || rows.length === 0) {
        return null; 
    }
    const totalSQL = `SELECT SUM(subtotal) AS total_devoluciones FROM detalle_preventa WHERE estado = 'devuelto' AND id_preventa = ?`;
    const [totalRows]: any = await db.execute(totalSQL, [id_presale]);
    const total = totalRows[0]?.total_devoluciones || 0;

    const { id_preventa, id_cliente, id_colaborador, estado } = rows[0];
    const detalle = rows.map((row: any) => ({
        id_producto: row.id_producto,
        cantidad: row.cantidad,
        subtotal: row.subtotal,
    }));
    console.log('DETALLEEE:', detalle);
    

    return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
}

// Obtener devoluciones por id como Administrador
static async getById(getRedund : GetRefundDTO){
    const sql = `
        SELECT 
            p.id_preventa,
            p.fecha_confirmacion,
            p.id_colaborador,
            p.id_cliente,
            SUM(dp.subtotal) AS total_devuelto
        FROM preventas p
        JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
        WHERE p.id_preventa = ?
        AND p.estado = 'Confirmada' 
        AND dp.estado = 'devuelto'
        GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
    `;
    const values = [getRedund.id_presale]; 
    const [rows] = await db.execute(sql, values);
    return rows as GetRefundDTO[];
}

// Obtener devolucion por ID como colaborador
static async getByIdColaborador(getRefund : GetRefundDTO, id_colaborador: number){
    const sql = `
        SELECT 
            p.id_preventa,
            p.fecha_confirmacion,
            p.id_colaborador,
            p.id_cliente,
            SUM(dp.subtotal) AS total_vendido
        FROM preventas p
        JOIN detalle_preventa dp ON p.id_preventa = dp.id_preventa
        WHERE p.id_preventa = ?
        AND p.id_colaborador = ?
        AND p.estado = 'Confirmada' 
        AND dp.estado = 'devuelto'
        GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
    `;
    const values = [getRefund.id_presale, id_colaborador]; 
    const [rows] = await db.execute(sql, values);      
    return rows as RefundDTO[];
}
}

export default RefundRepository;