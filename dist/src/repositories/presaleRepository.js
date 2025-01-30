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
    // Registrar una preventa
    static registerPresale(presale, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection(); // Obtener conexión para la transacción
            try {
                yield connection.beginTransaction();
                // Paso 1: Insertar la preventa
                const presaleSql = 'INSERT INTO preventas (id_cliente, id_colaborador) VALUES (?, ?)';
                const presaleValues = [presale.id_cliente, presale.id_colaborador];
                console.log('ID_COLABORADOR: ', presale.id_colaborador);
                const [presaleResult] = yield connection.execute(presaleSql, presaleValues);
                const presaleId = presaleResult.insertId;
                // Paso 2: Insertar los detalles
                const detailSql = `
                INSERT INTO detalle_preventa (id_preventa, id_producto, cantidad, subtotal) 
                VALUES (?, ?, ?, ?)`;
                for (const detail of details) {
                    // Obtener el precio del producto desde el microservicio de productos
                    const productResponse = yield axios_1.default.get(`${PRODUCT_SERVICE_URL}/${detail.id_producto}`);
                    const product = yield axios_1.default.get(`http://localhost:10104/api/cantidadIngresada/${detail.id_producto}`);
                    console.log('DATAPRODUCT', product.data);
                    if (!product || product.data.cantidadIngreso < detail.cantidad) {
                        throw new Error(`Stock insuficiente para el producto ${detail.id_producto}`);
                    }
                    const price = productResponse.data.precio;
                    const subtotal = price * detail.cantidad;
                    // Insertar el detalle en la base de datos
                    const detailValues = [presaleId, detail.id_producto, detail.cantidad, subtotal];
                    yield connection.execute(detailSql, detailValues);
                    let cantidad = product.data.cantidadIngreso - detail.cantidad;
                    console.log('CANTIDADDDDD: ', cantidad);
                    console.log('CANTIDAD-INGRESO:', product.data.cantidadIngreso);
                    console.log('CANTIDAD:', detail.cantidad);
                    // Actualizar la cantidad en el microservicio de productos
                    yield axios_1.default.put(`http://localhost:10104/api/products/actualizar-cantidad/${detail.id_producto}/${cantidad}`);
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
    // Obtener todos las preventas como administrador
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM preventas';
            const [rows] = yield db_1.default.query(sql);
            return rows;
        });
    }
    // Obtener las preventas propias 
    static getAllColaborador(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM preventas WHERE id_colaborador = ?';
            const values = [userId];
            const [rows] = yield db_1.default.query(sql, values);
            return rows;
        });
    }
    // Obtener preventa por id como Administrador
    static getById(getPresale) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM preventas WHERE id_preventa = ?';
            const values = [getPresale.id_presale];
            const [rows] = yield db_1.default.execute(sql, values);
            return rows;
        });
    }
    // Obtener preventa por ID como colaborador
    static getByIdColaborador(getPresale, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM preventas WHERE id_preventa = ? AND id_colaborador = ?';
            const values = [getPresale.id_presale, id_colaborador];
            const [rows] = yield db_1.default.execute(sql, values);
            return rows;
        });
    }
    // Eliminar preventa, administrador
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
    static confirm(id_presale, returnedProductos) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            try {
                yield connection.beginTransaction();
                // Validar que la preventa exista y esté pendiente
                const [preventaRows] = yield connection.execute(`SELECT estado FROM preventas WHERE id_preventa = ?`, [id_presale]);
                const preventa = preventaRows[0];
                if (!preventa || preventa.estado !== 'Pendiente') {
                    yield connection.rollback();
                    return false; // Preventa no encontrada o ya confirmada
                }
                // Actualizar el estado de los productos devueltos
                if (returnedProductos && returnedProductos.length > 0) {
                    const placeholders = returnedProductos.map(() => '?').join(',');
                    yield connection.execute(`
                    UPDATE detalle_preventa 
                    SET estado = 'devuelto' 
                    WHERE id_preventa = ? AND id_producto IN (${placeholders})`, [id_presale, ...returnedProductos]);
                }
                // Confirmar la preventa
                const [updateResult] = yield connection.execute(`
                UPDATE preventas 
                SET estado = 'Confirmada', fecha_confirmacion = NOW() 
                WHERE id_preventa = ?`, [id_presale]);
                // Confirmar que la actualización fue exitosa
                if (updateResult.affectedRows === 0) {
                    yield connection.rollback();
                    return false;
                }
                yield connection.commit(); // Confirmar los cambios
                return true;
            }
            catch (error) {
                yield connection.rollback(); // Revertir los cambios en caso de error
                throw error;
            }
            finally {
                connection.release(); // Liberar la conexión
            }
        });
    }
    // para editar un producto en la preventa 
    static update(updatePresale) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si id_detalle existe
            const [detalle] = yield db_1.default.execute("SELECT 1 FROM detalle_preventa WHERE id_detalle = ?", [updatePresale.id_detalle]);
            if (detalle.length === 0) {
                throw new Error('Detalle de preventa no encontrado');
            }
            // Verificar si id_producto existe
            const [producto] = yield db_1.default.execute("SELECT 1 FROM productos WHERE id_producto = ?", [updatePresale.id_producto]);
            if (producto.length === 0) {
                throw new Error('Detalle de preventa no encontrado');
            }
            const sql = 'UPDATE detalle_preventa SET id_producto = ?, cantidad = ? WHERE id_detalle = ? and id_producto = ?';
            const values = [updatePresale.id_producto, updatePresale.cantidad, updatePresale.id_detalle, updatePresale.id_producto];
            return db_1.default.execute(sql, values);
        });
    }
    // para agregar nuevos productos a la preventa
    static addProductsPresale(addProducts) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            try {
                yield connection.beginTransaction();
                // Paso 1: Insertar los productos
                const productsSql = `INSERT INTO detalle_preventa (id_preventa, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)`;
                for (const detail of addProducts) {
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
                    const productsValues = [detail.id_preventa, detail.id_producto, detail.cantidad, subtotal];
                    yield connection.execute(productsSql, productsValues);
                }
                // Paso 3: Calcular el total de la preventa
                const idPreventa = addProducts[0].id_preventa;
                const totalSql = `
                UPDATE preventas 
                SET total = (SELECT SUM(subtotal) FROM detalle_preventa WHERE id_preventa = ?) 
                WHERE id_preventa = ?`;
                yield connection.execute(totalSql, [idPreventa, idPreventa]);
                yield connection.commit();
                return;
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
    // para obtener toda la informacion de una preventa como Administrador
    static getIdsPresale(id_presale) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const values = [id_presale];
            const [rows] = yield db_1.default.execute(sql, values);
            if (!rows || rows.length === 0) {
                return null; // Preventa no encontrada
            }
            // Agrupar productos en el array 'detalle'
            const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
            const detalle = rows.map((row) => ({
                id_producto: row.id_producto,
                cantidad: row.cantidad,
                subtotal: row.subtotal,
            }));
            return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
        });
    }
    // Obtener detalle de una preventa como colaborador
    static getIdsPresaleColaborador(id_presale, userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const [rows] = yield db_1.default.execute(sql, values);
            if (!rows || rows.length === 0) {
                return null; // Preventa no encontrada
            }
            // Agrupar productos en el array 'detalle'
            const { id_preventa, id_cliente, id_colaborador, total, estado } = rows[0];
            const detalle = rows.map((row) => ({
                id_producto: row.id_producto,
                cantidad: row.cantidad,
                subtotal: row.subtotal,
            }));
            return { id_preventa, id_cliente, id_colaborador, total, estado, detalle };
        });
    }
}
exports.default = PresaleRepository;
