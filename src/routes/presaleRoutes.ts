import express from "express";


import verifyToken from "../middleware/verifyToken";
import checkRoleAndPermission from "../middleware/checkRoleAndPermission";
import register_presale from "../controllers/presaleController/registerPresale";
import { validatorParams, validator } from "../middleware/presaleMiddleware/registerPresaleValidator";
import getAll_presale from "../controllers/presaleController/getAllPresale";
import get_detailsPresale from "../controllers/presaleController/getDetailsPreventa";
import cancel_presale from "../controllers/presaleController/cancelPresale";
import getById_Presale from "../controllers/presaleController/getByIdPresale";
import update_presale from "../controllers/presaleController/updatePresale";
import addProductsPresale from "../controllers/presaleController/addProductsPresale";
import confirm_presale from "../controllers/presaleController/confirmPresale";
import { validatorParamsIdPresale, validatorIdPresale } from '../middleware/presaleMiddleware/idPresaleValidator';
import { validatorIdDetallePresale, validatorParamsIdDetallePresale } from "../middleware/presaleMiddleware/idDetallePresaleValidator";
import { validatorParamsUpdatePresale, validatorUpdatePresale } from "../middleware/presaleMiddleware/updatePresaleValidator";

import delete_presale from "../controllers/presaleController/deletePresale";

const router = express.Router();

// POST: Crear una preventa
router.post("/registerPresale", verifyToken, checkRoleAndPermission(["COLABORADOR"]), validatorParams, validator, register_presale);

// POST: para agregar nuevos productos a la preventa
router.post("/addProductsPresale/:id_presale", verifyToken, checkRoleAndPermission(["COLABORADOR"]), validatorParamsIdPresale, validatorIdPresale, addProductsPresale)

// GET: Obtener todas las preventas
router.get("/getAllPresales", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), getAll_presale);

// GET: Obtener presale por id
router.get("/getPresaleById/:id_presale", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), validatorParamsIdPresale, validatorIdPresale, getById_Presale);

// GET: todo el detalle de la preventa
router.get("/detailsPresale/:id_preventa", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), validatorIdDetallePresale, validatorParamsIdDetallePresale, get_detailsPresale);
// 
// PUT: cancelar una preventa
router.put("/cancelPreventa/:id_presale", verifyToken, checkRoleAndPermission(["COLABORADOR"]), validatorParamsIdPresale, validatorIdPresale, cancel_presale);

// PUT: confirmarPreventa
//router.put("/confirmPresale/:id_presale", confirm_presale);
router.put("/confirmPresale/:id_presale", verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), validatorParamsIdPresale, validatorIdPresale, confirm_presale);

// PUT: Actualizar preventa
router.put("/updatePresale/:id_preventa", verifyToken, checkRoleAndPermission(["COLABORADOR"]), validatorParamsUpdatePresale, validatorUpdatePresale, update_presale);

// DELETE: eliminar preventa
router.delete("/deletePresale/:id_preventa",  verifyToken, checkRoleAndPermission(["ADMINISTRADOR"]), delete_presale )


export default router;
