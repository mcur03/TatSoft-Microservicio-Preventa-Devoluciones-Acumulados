import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import EstatePresale from "../../Dto/DtoPresale/EstatePresaleDto";

let cancel_presale = async (req: Request, res: Response): Promise<void> =>{
    try {
        const userId = req.body.id_usuario;
        const { id_presale } = req.params;
        const result = await PresaleService.cancelPresale(new EstatePresale(id_presale), userId);
        
        if(!result){
            res.status(404).json({error: 'Preventa no encrontrada'});
        }else{
            res.status(200).json({message:'La preventa fue cancelada'})
        }
    } catch (error:any) {
        res.status(500).json({ error: "Error interno del servidor", details: error.message});
    }
    return;
}

export default cancel_presale;