import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import UpdatePresale from "../../Dto/DtoPresale/updatePresaleDto";

let update_presale = async(req:Request, res:Response): Promise<void> =>{
    try {
        const userId = req.body.id_usuario;
        const id_preventa  = req.params.id_preventa;
        const { id_producto, cantidad } = req.body;

        const result = await PresaleService.updatePresale(new UpdatePresale( id_preventa, id_producto, cantidad ), userId)
        if(!result){
            res.status(404).json({ error: "Preventa no encontrado." });
        }
        else{ 
            res.status(200).json({message:'Preventa actualizado con éxito'}); 
        }
    } catch (error:any) {
        if(error && error.code == "ER_DUP_ENTRY"){
            res.status(500).json({errorInfo: error.sqlMessage});
        }else{
            res.status(500).json({error: "Error interno del servidor", details: error.message });
        }
    }
}

export default update_presale;