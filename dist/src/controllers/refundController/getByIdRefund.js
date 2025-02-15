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
const refundService_1 = __importDefault(require("../../services/refundService"));
const getRefundDto_1 = __importDefault(require("../../Dto/DtoRefund/getRefundDto"));
let getById_Refund = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_presale } = req.params;
        const userRole = req.body.role;
        const userId = req.body.id_usuario;
        const result = userRole === "COLABORADOR"
            ? yield refundService_1.default.getByIdRefundColaborador(new getRefundDto_1.default(id_presale), userId)
            : yield refundService_1.default.getByIdRefund(new getRefundDto_1.default(id_presale));
        if (result.length === 0) {
            res.status(404).json({ error: 'Devolución no encontrada' });
            return;
        }
        else {
            res.status(200).json({ message: result });
            return;
        }
    }
    catch (error) {
        if (error && error.code == "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
            return;
        }
        else {
            res.status(500).json({ error: "Error interno del servidor", details: error.message });
            return;
        }
    }
});
exports.default = getById_Refund;
