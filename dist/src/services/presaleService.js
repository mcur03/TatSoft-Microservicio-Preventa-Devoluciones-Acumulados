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
const presaleRepository_1 = __importDefault(require("../repositories/presaleRepository"));
class PresaleService {
    static register_presale(presale, details) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.registerPresale(presale, details);
        });
    }
    static getAllPresales() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.getAll();
        });
    }
    static getAllPresalesColaborador(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.getAllColaborador(userId);
        });
    }
    static getByIdPresale(getPresale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.getById(getPresale);
        });
    }
    static getByIdPresaleColaborador(getPresale, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.getByIdColaborador(getPresale, id_colaborador);
        });
    }
    static deletePresale(deletePresale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.delete(deletePresale);
        });
    }
    static cancelPresale(cancelPresale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.cancel(cancelPresale);
        });
    }
    static confirmPresale(id_presale, returnedProductos) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.confirm(id_presale, returnedProductos);
        });
    }
    static updatePresale(updatePresale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield presaleRepository_1.default.update(updatePresale);
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
