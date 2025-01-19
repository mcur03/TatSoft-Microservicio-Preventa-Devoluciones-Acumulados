import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import DeletePresale from "../../Dto/DtoPresale/deletePresaleDto";

let delete_presale = async (req: Request, res: Response) =>{
    try {
        const { id_presale } = req.params;
        const result = await PresaleService.deletePresale(new DeletePresale(id_presale));
        
        if(!result){
            return res.status(404).json({error: 'Preventa no encrontrado'});
        }else{
            return res.status(200).json({message:'La preventa fue eliminada'})
        }
    } catch (error:any) {
        return res.status(500).json({ error: "Error interno del servidor"});
    }
}

export default delete_presale;