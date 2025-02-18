import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";

let confirm_presale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_presale } = req.params; // ID de la preventa
        const { returnedProductos } = req.body; // Productos devueltos

        const result = await PresaleService.confirmPresale(id_presale, returnedProductos);

        if (!result) {
            res.status(404).json({ error: 'Preventa no encontrada o ya confirmada' });
        } else {
            res.status(200).json({ message: 'La preventa fue confirmada con éxito' });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
    return;
};

export default confirm_presale;