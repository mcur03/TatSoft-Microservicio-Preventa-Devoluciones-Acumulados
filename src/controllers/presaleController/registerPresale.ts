import { Request, Response } from "express";
import Presale from "../../Dto/DtoPresale/presaleDto";
import DetailsPresale from "../../Dto/DtoPresale/detailsPresaleDto";
import PresaleService from "../../services/presaleService";

let register_presale = async (req: Request, res: Response) => {
    try {
        const { id_cliente, id_colaborador, detalles } = req.body;

        const presale = new Presale('Pendiente', 0, id_cliente, id_colaborador);
        const details = detalles.map((detalle:any) => 
            new DetailsPresale('', detalle.id_producto, detalle.cantidad)
        );

        const presaleId = await PresaleService.register_presale(presale, details);

        res.status(201).json({ message: 'Preventa creada', presaleId });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la preventa', message: error.message});
    }
}

export default register_presale;