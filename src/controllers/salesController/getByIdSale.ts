import { Request, Response } from "express";
import GetSale from "../../Dto/DtoSales/getSaleDto";
import SalesService from "../../services/salesService";

let getById_Sale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_presale } = req.params;
        const userRole = req.body.role;
        const userId = req.body.id_usuario;

        const result =
            userRole === "COLABORADOR"
                ? await SalesService.getByIdSaleColaborador(new GetSale(id_presale), userId)
                : await SalesService.getByIdSale(new GetSale(id_presale));
                
        if(result.length === 0){
            res.status(404).json({error: 'Venta no encontrada'})
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
            res.status(500).json({ error: "Internal Server Error", details: error.message });
            return;
        }
    }
}

export default getById_Sale;