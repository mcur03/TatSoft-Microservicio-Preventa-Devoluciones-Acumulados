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
const getPresaleDto_1 = __importDefault(require("../../Dto/DtoPresale/getPresaleDto"));
let getById_Presale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_presale } = req.params;
        const result = yield presaleService_1.default.getByIdPresale(new getPresaleDto_1.default(id_presale));
        if (!result) {
            return res.status(404).json({ error: 'Preventa no encontrada' });
        }
        else {
            return res.status(200).json({ message: result });
        }
    }
    catch (error) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        }
        else {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
});
exports.default = getById_Presale;
