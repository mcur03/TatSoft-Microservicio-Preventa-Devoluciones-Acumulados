"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const checkRoleAndPermission_1 = __importDefault(require("../middleware/checkRoleAndPermission"));
const getRefunds_1 = __importDefault(require("../controllers/refundController/getRefunds"));
const getSaleDetails_1 = __importDefault(require("../controllers/refundController/getSaleDetails"));
const getByIdRefund_1 = __importDefault(require("../controllers/refundController/getByIdRefund"));
const router = express_1.default.Router();
router.get("/getAllRefund", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), getRefunds_1.default);
router.get("/getRefundDetails/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), getSaleDetails_1.default);
router.get("/getByIdRefund/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), getByIdRefund_1.default);
exports.default = router;
