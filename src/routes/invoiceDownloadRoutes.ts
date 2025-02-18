import express from "express";
import invoiceDownloadController from "../controllers/invoiceDownloadController/invoiceDownloadController";

const router = express.Router();

router.post('/invoiceDownload/:id_preventa', invoiceDownloadController);

export default router;