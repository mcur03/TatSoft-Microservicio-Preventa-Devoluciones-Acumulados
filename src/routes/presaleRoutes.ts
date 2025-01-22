import express from "express";
import register_presale from "../controllers/presaleController/registerPresale";
import { validatorParams, validator } from "../middleware/presaleMiddleware/registerPresaleValidator";
import getAll_presale from "../controllers/presaleController/getAllPresale";
import get_detailsPresale from "../controllers/presaleController/getDetailsPreventa";

const router = express.Router();

// POST: Crear una preventa
router.post("/registerPresale", validatorParams, validator, register_presale);

// GET: Obtener todas las preventas
router.get("/getAllPresales", getAll_presale);

// GET: todo el detalle de la preventa
router.get("/detailsPresale/:id_presale", get_detailsPresale);

export default router;
