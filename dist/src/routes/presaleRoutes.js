"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const checkRoleAndPermission_1 = __importDefault(require("../middleware/checkRoleAndPermission"));
const registerPresale_1 = __importDefault(require("../controllers/presaleController/registerPresale"));
const registerPresaleValidator_1 = require("../middleware/presaleMiddleware/registerPresaleValidator");
const getAllPresale_1 = __importDefault(require("../controllers/presaleController/getAllPresale"));
const getDetailsPreventa_1 = __importDefault(require("../controllers/presaleController/getDetailsPreventa"));
const cancelPresale_1 = __importDefault(require("../controllers/presaleController/cancelPresale"));
const getByIdPresale_1 = __importDefault(require("../controllers/presaleController/getByIdPresale"));
const updatePresale_1 = __importDefault(require("../controllers/presaleController/updatePresale"));
const addProductsPresale_1 = __importDefault(require("../controllers/presaleController/addProductsPresale"));
const confirmPresale_1 = __importDefault(require("../controllers/presaleController/confirmPresale"));
const idPresaleValidator_1 = require("../middleware/presaleMiddleware/idPresaleValidator");
const idDetallePresaleValidator_1 = require("../middleware/presaleMiddleware/idDetallePresaleValidator");
const updatePresaleValidator_1 = require("../middleware/presaleMiddleware/updatePresaleValidator");
const deletePresale_1 = __importDefault(require("../controllers/presaleController/deletePresale"));
const router = express_1.default.Router();
// POST: Crear una preventa
router.post("/registerPresale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["COLABORADOR"]), registerPresaleValidator_1.validatorParams, registerPresaleValidator_1.validator, registerPresale_1.default);
// POST: para agregar nuevos productos a la preventa
router.post("/addProductsPresale/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["COLABORADOR"]), idPresaleValidator_1.validatorParamsIdPresale, idPresaleValidator_1.validatorIdPresale, addProductsPresale_1.default);
// GET: Obtener todas las preventas
router.get("/getAllPresales", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), getAllPresale_1.default);
// GET: Obtener presale por id
router.get("/getPresaleById/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), idPresaleValidator_1.validatorParamsIdPresale, idPresaleValidator_1.validatorIdPresale, getByIdPresale_1.default);
// GET: todo el detalle de la preventa
router.get("/detailsPresale/:id_preventa", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR", "COLABORADOR"]), idDetallePresaleValidator_1.validatorIdDetallePresale, idDetallePresaleValidator_1.validatorParamsIdDetallePresale, getDetailsPreventa_1.default);
// 
// PUT: cancelar una preventa
router.put("/cancelPreventa/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["COLABORADOR"]), idPresaleValidator_1.validatorParamsIdPresale, idPresaleValidator_1.validatorIdPresale, cancelPresale_1.default);
// PUT: confirmarPreventa
//router.put("/confirmPresale/:id_presale", confirm_presale);
router.put("/confirmPresale/:id_presale", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR"]), idPresaleValidator_1.validatorParamsIdPresale, idPresaleValidator_1.validatorIdPresale, confirmPresale_1.default);
// PUT: Actualizar preventa
router.put("/updatePresale/:id_preventa", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["COLABORADOR"]), updatePresaleValidator_1.validatorParamsUpdatePresale, updatePresaleValidator_1.validatorUpdatePresale, updatePresale_1.default);
// DELETE: eliminar preventa
router.delete("/deletePresale/:id_preventa", verifyToken_1.default, (0, checkRoleAndPermission_1.default)(["ADMINISTRADOR"]), deletePresale_1.default);
exports.default = router;
