import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import GetPresale from "../../Dto/DtoPresale/getPresaleDto";

let getById_Presale = async (req: Request, res: Response) => {
    try {
        const { id_presale } = req.params;
        const result = await PresaleService.getByIdPresale(new GetPresale(id_presale));
        if(!result){
            return res.status(404).json({error: 'Preventa no encontrada'})
        }else{
            return res.status(200).json({ message: result });
        }
    } catch (error:any) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
}

export default getById_Presale;