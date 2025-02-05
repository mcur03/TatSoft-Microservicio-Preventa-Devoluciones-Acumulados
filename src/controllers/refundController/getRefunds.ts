import { Request, Response } from "express";
import RefundService from "../../services/refundService";

const getAll_refund = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRole = req.body.role;
        const userId = req.body.id_usuario;

        const result =
            userRole === "COLABORADOR"
                ? await RefundService.getAllRefundColaborador(userId)
                : await RefundService.getAllRefund();
        console.log('RESULT: ', result);
        

        if (!result) {
            res.status(404).json({ error: 'No hay devoluciones' });
            return;
        }

        res.status(200).json(result);
    } catch (error: any) {
        if (error && error.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
};

export default getAll_refund;
