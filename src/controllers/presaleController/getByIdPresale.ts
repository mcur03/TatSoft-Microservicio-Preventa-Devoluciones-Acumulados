import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import GetPresale from "../../Dto/DtoPresale/getPresaleDto";

let getById_Presale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_presale } = req.params;
        const userRole = req.body.role;
        const userId = req.body.id_usuario;

        const result =
            userRole === "COLABORADOR"
                ? await PresaleService.getByIdPresaleColaborador(new GetPresale(id_presale), userId)
                : await PresaleService.getByIdPresale(new GetPresale(id_presale));
                
        if(result.length === 0){
            res.status(404).json({error: 'Preventa no encontrada'})
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

export default getById_Presale;