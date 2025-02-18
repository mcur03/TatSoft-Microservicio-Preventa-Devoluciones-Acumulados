"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class RefundRepository {
    // Obtener todos las devoluciones como administrador
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
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
            const [rows] = yield db_1.default.execute(sql);
            return rows;
        });
    }
    // Obtener las devoluciones propias 
    static getAllColaborador(userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const values = [userId];
            const [rows] = yield db_1.default.execute(sql, values);
            console.log('ROWS', rows);
            return rows;
        });
    }
    // Obtener el detalle de una devoculion como administrador
    static getRefundDetails(id_presale) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
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
            const [rows] = yield db_1.default.execute(sql, values);
            if (!rows || rows.length === 0) {
                return null; // Preventa no encontrada
            }
            const totalSQL = `SELECT SUM(subtotal) AS total_devoluciones FROM detalle_preventa WHERE estado = 'devuelto' AND id_preventa = ?`;
            const [totalRows] = yield db_1.default.execute(totalSQL, [id_presale]);
            const total = ((_a = totalRows[0]) === null || _a === void 0 ? void 0 : _a.total_devoluciones) || 0; // Extraer solo el valor // <-- CORREGIDO
            console.log('TOTALL:', total);
            const { id_preventa, id_cliente, id_colaborador, estado } = rows[0];
            const detalle = rows.map((row) => ({
                id_producto: row.id_producto,
                cantidad: row.cantidad,
                subtotal: row.subtotal,
            }));
            console.log('DETALLEEE:', detalle);
            return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
        });
    }
    // Obtener el datelle de una devolucion como colaborador
    static getRefundDetailsColaborador(id_presale, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
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
            const [rows] = yield db_1.default.execute(sql, values);
            if (!rows || rows.length === 0) {
                return null; // Preventa no encontrada
            }
            const totalSQL = `SELECT SUM(subtotal) AS total_devoluciones FROM detalle_preventa WHERE estado = 'devuelto' AND id_preventa = ?`;
            const [totalRows] = yield db_1.default.execute(totalSQL, [id_presale]);
            const total = ((_a = totalRows[0]) === null || _a === void 0 ? void 0 : _a.total_devoluciones) || 0;
            const { id_preventa, id_cliente, id_colaborador, estado } = rows[0];
            const detalle = rows.map((row) => ({
                id_producto: row.id_producto,
                cantidad: row.cantidad,
                subtotal: row.subtotal,
            }));
            console.log('DETALLEEE:', detalle);
            return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
        });
    }
    // Obtener devoluciones por id como Administrador
    static getById(getRedund) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const [rows] = yield db_1.default.execute(sql, values);
            return rows;
        });
    }
    // Obtener devolucion por ID como colaborador
    static getByIdColaborador(getRefund, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const [rows] = yield db_1.default.execute(sql, values);
            return rows;
        });
    }
}
exports.default = RefundRepository;
