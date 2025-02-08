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
class SalesRepository {
    // Obtener todos las ventas como administrador
    static getAll() {
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
        WHERE p.estado = 'Confirmada' 
        AND dp.estado = 'vendido'
        GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
        `;
            const [rows] = yield db_1.default.execute(sql);
            return rows;
        });
    }
    // Obtener las ventas propias 
    static getAllColaborador(userId) {
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
            WHERE p.estado = 'Confirmada' 
            AND dp.estado = 'vendido'
            AND p.id_colaborador = ?
            GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
        `;
            const values = [userId];
            const [rows] = yield db_1.default.execute(sql, values);
            console.log('ROWS', rows);
            return rows;
        });
    }
    // Obtener el detalle de una venta como administrador
    static getSaleDetails(id_presale) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const [rows] = yield db_1.default.execute(sql, values);
            if (!rows || rows.length === 0) {
                return null; // Preventa no encontrada
            }
            const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
            const detalle = rows.map((row) => ({
                id_producto: row.id_producto,
                cantidad: row.cantidad,
                subtotal: row.subtotal,
            }));
            return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
            //return rows as SalesDTO[];
        });
    }
    // Obtener el datelle de una venta como colaborador
    static getSaleDetailsColaborador(id_presale, userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const [rows] = yield db_1.default.execute(sql, values);
            if (!rows || rows.length === 0) {
                return null; // Preventa no encontrada
            }
            const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
            const detalle = rows.map((row) => ({
                id_producto: row.id_producto,
                cantidad: row.cantidad,
                subtotal: row.subtotal,
            }));
            return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
            //return rows as SalesDTO[];
        });
    }
    // Obtener venta por id como Administrador
    static getById(getSale) {
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
        AND p.estado = 'Confirmada' 
        AND dp.estado = 'vendido'
        GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
    `;
            const values = [getSale.id_presale];
            const [rows] = yield db_1.default.execute(sql, values);
            return rows;
        });
    }
    // Obtener venta por ID como colaborador
    static getByIdColaborador(getSale, id_colaborador) {
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
        AND dp.estado = 'vendido'
        GROUP BY p.id_preventa, p.fecha_confirmacion, p.id_colaborador, p.id_cliente;
    `;
            const values = [getSale.id_presale, id_colaborador];
            const [rows] = yield db_1.default.execute(sql, values);
            return rows;
        });
    }
}
exports.default = SalesRepository;
