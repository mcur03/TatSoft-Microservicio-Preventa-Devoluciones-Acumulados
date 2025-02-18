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
const refundRepository_1 = __importDefault(require("../repositories/refundRepository"));
class RefundService {
    static getAllRefund() {
        return __awaiter(this, void 0, void 0, function* () {
            const refunds = yield refundRepository_1.default.getAll();
            for (const refund of refunds) {
                try {
                    // Obtener datos del colaborador (usuario)
                    const userResponse = yield axios_1.default.get(`http://localhost:10101/api/usuarios/id_usuario/${refund.id_colaborador}`);
                    ;
                    console.log('USERRRRRRRRRR: ', userResponse.data);
                    refund.nombre_colaborador = userResponse.data;
                    // Obtener datos del cliente y zona
                    const clientResponse = yield axios_1.default.get(`http://localhost:10102/api/client/${refund.id_cliente}`);
                    console.log('DATACLIENT:', clientResponse.data);
                    refund.razon_social = clientResponse.data.razon_social;
                    refund.nombre_zona = clientResponse.data.zona;
                }
                catch (error) {
                    console.error("Error obteniendo datos de otros microservicios:", error);
                }
            }
            return refunds;
        });
    }
    static getAllRefundColaborador(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refunds = yield refundRepository_1.default.getAllColaborador(userId);
            for (const refund of refunds) {
                try {
                    // Obtener datos del colaborador (usuario)
                    const userResponse = yield axios_1.default.get(`http://localhost:10101/api/usuarios/id_usuario/${refund.id_colaborador}`);
                    ;
                    console.log('USERRRRRRRRRR: ', userResponse.data);
                    refund.nombre_colaborador = userResponse.data.nombreCompleto;
                    // Obtener datos del cliente y zona
                    const clientResponse = yield axios_1.default.get(`http://localhost:10102/api/client/${refund.id_cliente}`);
                    console.log('DATACLIENT:', clientResponse.data);
                    refund.razon_social = clientResponse.data.razon_social;
                    refund.nombre_zona = clientResponse.data.zona;
                }
                catch (error) {
                    console.error("Error obteniendo datos de otros microservicios:", error);
                }
            }
            return refunds;
        });
    }
    static getRefundDetails(id_presale) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield refundRepository_1.default.getRefundDetails(id_presale);
        });
    }
    static getRefundDetailsColaborador(id_presale, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield refundRepository_1.default.getRefundDetailsColaborador(id_presale, userId);
        });
    }
    static getByIdRefund(getRefund) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield refundRepository_1.default.getById(getRefund);
        });
    }
    static getByIdRefundColaborador(getReund, id_colaborador) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield refundRepository_1.default.getByIdColaborador(getReund, id_colaborador);
        });
    }
}
exports.default = RefundService;
