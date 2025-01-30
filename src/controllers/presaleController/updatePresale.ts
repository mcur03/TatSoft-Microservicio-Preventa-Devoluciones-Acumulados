import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import UpdatePresale from "../../Dto/DtoPresale/updatePresaleDto";

let update_presale = async(req:Request, res:Response): Promise<void> =>{
    try {
        const { id_detalle } = req.params;
        const { id_producto, cantidad } = req.body;

        const result = await PresaleService.updatePresale(new UpdatePresale( id_detalle, id_producto, cantidad ))
        if(!result){
            res.status(404).json({ error: "Preventa no encontrado." });
            return;
        }
        else{ 
            res.status(200).json({message:'Preventa actualizado con éxito'}); 
            return;
        }
    } catch (error:any) {
        if(error && error.code == "ER_DUP_ENTRY"){
            res.status(500).json({errorInfo: error.sqlMessage});
            return;
        }else{
            res.status(500).json({error: "Internal Server Error", details: error.message });
            return;
        }
    }
}

export default update_presale;