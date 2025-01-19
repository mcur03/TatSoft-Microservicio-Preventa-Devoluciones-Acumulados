import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import UpdatePresale from "../../Dto/DtoPresale/updatePresaleDto";

let update_presale = async(req:Request, res:Response) =>{
    try {
        const { id_detalle } = req.params;
        const { id_producto, cantidad } = req.body;

        const result = await PresaleService.updatePresale(new UpdatePresale( id_detalle, id_producto, cantidad ))
        if(!result){
            return res.status(404).json({ error: "Preventa no encontrado." });
        }
        else{ 
            return res.status(200).json({message:'Preventa actualizado con éxito'}); 
        }
    } catch (error:any) {
        if(error && error.code == "ER_DUP_ENTRY"){
            return res.status(500).json({errorInfo: error.sqlMessage})
        }else{
            return res.status(500).json({error: "Internal Server Error", details: error.message })
        }
    }
}

export default update_presale;