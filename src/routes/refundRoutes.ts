import express from "express";
import verifyToken from "../middleware/verifyToken";
import checkRoleAndPermission from "../middleware/checkRoleAndPermission";
import getAll_refund from "../controllers/refundController/getRefunds";
import getRefundDetails from "../controllers/refundController/getRefundDetails";
import getById_Refund from "../controllers/refundController/getByIdRefund";

const router = express.Router();


router.get("/getAllRefund", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), getAll_refund);
router.get("/getRefundDetails/:id_presale", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), getRefundDetails);
router.get("/getByIdRefund/:id_presale", verifyToken, checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]), getById_Refund)

export default router;