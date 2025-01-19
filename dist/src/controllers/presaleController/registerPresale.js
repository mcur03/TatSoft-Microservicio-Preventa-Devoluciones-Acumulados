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
const presaleDto_1 = __importDefault(require("../../Dto/DtoPresale/presaleDto"));
const detailsPresaleDto_1 = __importDefault(require("../../Dto/DtoPresale/detailsPresaleDto"));
const presaleRepository_1 = __importDefault(require("../../repositories/presaleRepository"));
let register_presale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_cliente, id_colaborador, detalles } = req.body;
        const presale = new presaleDto_1.default('Pendiente', 0, id_cliente, id_colaborador);
        const details = detalles.map((detalle) => new detailsPresaleDto_1.default('', detalle.id_producto, detalle.cantidad));
        const presaleId = yield presaleRepository_1.default.createPresaleWithDetails(presale, details);
        res.status(201).json({ message: 'Preventa creada', presaleId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la preventa' });
    }
});
exports.default = register_presale;
