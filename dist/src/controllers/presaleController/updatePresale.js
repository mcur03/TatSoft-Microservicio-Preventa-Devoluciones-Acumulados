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
const presaleService_1 = __importDefault(require("../../services/presaleService"));
const updatePresaleDto_1 = __importDefault(require("../../Dto/DtoPresale/updatePresaleDto"));
let update_presale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_detalle } = req.params;
        const { id_producto, cantidad } = req.body;
        const result = yield presaleService_1.default.updatePresale(new updatePresaleDto_1.default(id_detalle, id_producto, cantidad));
        if (!result) {
            res.status(404).json({ error: "Preventa no encontrado." });
            return;
        }
        else {
            res.status(200).json({ message: 'Preventa actualizado con éxito' });
            return;
        }
    }
    catch (error) {
        if (error && error.code == "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
            return;
        }
        else {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
            return;
        }
    }
});
exports.default = update_presale;
