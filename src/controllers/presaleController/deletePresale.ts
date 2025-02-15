import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import DeletePresale from "../../Dto/DtoPresale/deletePresaleDto";

let delete_presale = async (req: Request, res: Response) =>{
    try {
        const { id_preventa } = req.params;
        const result = await PresaleService.deletePresale(new DeletePresale(id_preventa));
        
        if(!result){
            res.status(404).json({error: 'Preventa no encrontrado'});
            return;
        }else{
            res.status(200).json({message:'La preventa fue eliminada'});
            return;
        }
    } catch (error:any) {
        res.status(500).json({ error: "Error interno del servidor", details: error.message});
        return;
    }
}

export default delete_presale;