"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerPresale_1 = __importDefault(require("../controllers/presaleController/registerPresale"));
const registerPresaleValidator_1 = require("../middleware/presaleMiddleware/registerPresaleValidator");
const getAllPresale_1 = __importDefault(require("../controllers/presaleController/getAllPresale"));
const getDetailsPreventa_1 = __importDefault(require("../controllers/presaleController/getDetailsPreventa"));
const router = express_1.default.Router();
// POST: Crear una preventa
router.post("/registerPresale", registerPresaleValidator_1.validatorParams, registerPresaleValidator_1.validator, registerPresale_1.default);
// GET: Obtener todas las preventas
router.get("/getAllPresales", getAllPresale_1.default);
// GET: todo el detalle de la preventa
router.get("/detailsPresale/:id_presale", getDetailsPreventa_1.default);
exports.default = router;
