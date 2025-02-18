"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const checkRoleAndPermission_1 = __importDefault(require("../middleware/checkRoleAndPermission"));
const getSales_1 = __importDefault(require("../controllers/salesController/getSales"));
const getSaleDetails_1 = __importDefault(require("../controllers/salesController/getSaleDetails"));
const getByIdSale_1 = __importDefault(require("../controllers/salesController/getByIdSale"));
const router = express_1.default.Router();
router.get("/getAllSales", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), getSales_1.default);
router.get("/getSaleDetails/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), getSaleDetails_1.default);
router.get("/getByIdSale/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), getByIdSale_1.default);
exports.default = router;
