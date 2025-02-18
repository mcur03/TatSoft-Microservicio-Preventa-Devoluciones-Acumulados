import { Request, Response } from "express";
import RefundService from "../../services/refundService";
import GetRefundDTO from "../../Dto/DtoRefund/getRefundDto";

let getById_Refund = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_presale } = req.params;
        const userRole = req.body.role;
        const userId = req.body.id_usuario;

        const result =
            userRole === "COLABORADOR"
                ? await RefundService.getByIdRefundColaborador(new GetRefundDTO(id_presale), userId)
                : await RefundService.getByIdRefund(new GetRefundDTO(id_presale));
                
        if(result.length === 0){
            res.status(404).json({error: 'Devolución no encontrada'})
            return;
        }else{
            res.status(200).json({ message: result });
            return;
        }
    } catch (error:any) {
        if (error && error.code == "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
            return;
        } else {
            res.status(500).json({ error: "Error interno del servidor", details: error.message });
            return;
        }
    }
}

export default getById_Refund;