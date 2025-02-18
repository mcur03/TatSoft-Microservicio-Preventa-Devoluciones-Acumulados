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
const dotenv_1 = __importDefault(require("dotenv"));
const presaleRepository_1 = __importDefault(require("../repositories/presaleRepository"));
dotenv_1.default.config();
class PresaleService {
    static register_presale(presale, details) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.registerPresale(presale, details);
        });
    }
    static getAllPresales() {
        return __awaiter(this, void 0, void 0, function* () {
            const presales = yield presaleRepository_1.default.getAll();
            return yield this.populatePresalesWithNames(presales);
        });
    }
    static getAllPresalesColaborador(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const presales = yield presaleRepository_1.default.getAllColaborador(userId);
            return yield this.populatePresalesWithNames(presales);
        });
    }
    // ----------------------------------------------------
    static populatePresalesWithNames(presales) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('ENTRO ACÁ');
            const updatedPresales = yield Promise.all(presales.map((presale) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Obtener el nombre del cliente
                    const clientResponse = yield axios_1.default.get(`${process.env.CLIENT_SERVICE_URL}${presale.id_cliente}`);
                    console.log('CLIENTERESPONSE:', clientResponse.data);
                    presale.nombre_cliente = clientResponse.data.nombre_completo_cliente;
                    // Obtener el nombre del colaborador
                    const userResponse = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}${presale.id_colaborador}`);
                    console.log('USERIIIIDDDDD', presale.id_colaborador);
                    console.log('USERrESPONSE:', userResponse.data);
                    presale.nombre_colaborador = userResponse.data.nombreCompleto;
                    return presale;
                }
                catch (error) {
                    console.error(`Error obteniendo nombres para preventa ${presale.id_preventa}:`, error.message);
                    return presale; // Devuelve el objeto original si falla la solicitud
                }
            })));
            return updatedPresales;
        });
    }
    // ----------------------------------------------------------------------
    static getByIdPresale(getPresale) {
        return __awaiter(this, void 0, void 0, function* () {
            const presales = yield presaleRepository_1.default.getById(getPresale);
            return yield this.populatePresalesWithNames(presales);
        });
    }
    static getByIdPresaleColaborador(getPresale, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
            const presales = yield presaleRepository_1.default.getByIdColaborador(getPresale, id_colaborador);
            return yield this.populatePresalesWithNames(presales);
        });
    }
    static deletePresale(deletePresale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.delete(deletePresale);
        });
    }
    static cancelPresale(cancelPresale, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.cancel(cancelPresale, id_colaborador);
        });
    }
    static confirmPresale(id_presale, returnedProductos) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.confirm(id_presale, returnedProductos);
        });
    }
    static updatePresale(updatePresale, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.update(updatePresale, id_colaborador);
        });
    }
    static addProductsPresale(addProductsPresale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.addProductsPresale(addProductsPresale);
        });
    }
    // funcion para obtener los ids de la preventa
    static get_idsPresale(id_presale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.getIdsPresale(id_presale);
        });
    }
    static get_idsPresaleColaborador(id_presale, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.getIdsPresaleColaborador(id_presale, id_colaborador);
        });
    }
}
exports.default = PresaleService;
