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
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
class PresaleRepository {
    static createPresaleWithDetails(presale, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection(); // Obtener conexión para la transacción
            try {
                yield connection.beginTransaction();
                // Paso 1: Insertar la preventa
                const presaleSql = 'INSERT INTO preventas (id_cliente, id_colaborador) VALUES (?, ?)';
                const presaleValues = [presale.id_cliente, presale.id_colaborador];
                const [presaleResult] = yield connection.execute(presaleSql, presaleValues);
                const presaleId = presaleResult.insertId;
                // Paso 2: Insertar los detalles
                const detailSql = `
            INSERT INTO detalle_preventa (id_preventa, id_producto, cantidad, subtotal) 
            VALUES (?, ?, ?, ?)`;
                for (const detail of details) {
                    // Obtener el precio del producto desde el microservicio de productos
                    const productResponse = yield axios_1.default.get(`${PRODUCT_SERVICE_URL}/${detail.id_producto}`);
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
                    yield connection.execute(detailSql, detailValues);
                }
                // Paso 3: Calcular el total de la preventa
                const totalSql = `
            UPDATE preventas 
            SET total = (SELECT SUM(subtotal) FROM detalle_preventa WHERE id_preventa = ?) 
            WHERE id_preventa = ?`;
                yield connection.execute(totalSql, [presaleId, presaleId]);
                yield connection.commit();
                return presaleId; // Devuelve el ID de la preventa creada
            }
            catch (error) {
                yield connection.rollback();
                throw error; // Re-lanzar el error para manejarlo
            }
            finally {
                connection.release();
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM preventas';
            const [rows] = yield db_1.default.query(sql);
            return rows[0];
        });
    }
    static getById(getPresale) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM preventas WHERE id_preventa = ?';
            const values = [getPresale.id_presale];
            const [rows] = yield db_1.default.execute(sql, values);
            return [rows];
        });
    }
    static getDetailPresale(getPresale) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static delete(deletePresale) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM prevetas WHERE id_preventa = ?';
            const values = [deletePresale.id_presale];
            const [result] = yield db_1.default.execute(sql, values);
            return result.affectedRows; // Devuelve el número de filas afectadas.
        });
    }
    static cancel(cancelPresale) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE preventas SET estado = "Cancelada" WHERE id_preventa = ?';
            const values = [cancelPresale.id_presale];
            const [result] = yield db_1.default.execute(sql, values);
            return result.affectedRows;
        });
    }
    static update(updatePresale) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE preventas SET id_producto = ?, cantidad = ? WHERE id_detalle = ?';
            const values = [updatePresale.id_producto, updatePresale.cantidad, updatePresale.id_detalle];
            return db_1.default.execute(sql, values);
        });
    }
}
exports.default = PresaleRepository;
