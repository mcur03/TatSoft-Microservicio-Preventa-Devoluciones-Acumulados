import express from "express";
import verifyToken from "../middleware/verifyToken";
import checkRoleAndPermission from "../middleware/checkRoleAndPermission";
import getAll_sales from "../controllers/salesController/getSales";
import getSaleDetails from "../controllers/salesController/getSaleDetails";
import getById_Sale from "../controllers/salesController/getByIdSale";

const router = express.Router();


router.get("/getAllSales", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), getAll_sales);
router.get("/getSaleDetails/:id_presale", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), getSaleDetails);
router.get("/getByIdSale/:id_presale", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), getById_Sale)

export default router;