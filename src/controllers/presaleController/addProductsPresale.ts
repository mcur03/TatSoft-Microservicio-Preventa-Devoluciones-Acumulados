import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import DetailsPresale from "../../Dto/DtoPresale/detailsPresaleDto";

let addProductsPresale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_presale } = req.params;
        const productsArray = req.body;

        if (!Array.isArray(productsArray)) {
            res.status(400).json({ error: "El cuerpo de la solicitud debe ser un arreglo de productos." });
            return;
        }

        const products = productsArray.map(product => {
            const { id_producto, cantidad } = product;
            return new DetailsPresale(id_presale, id_producto, cantidad);
        });
        
        await PresaleService.addProductsPresale(products);

        res.status(201).json({ message: 'Productos agregados'});
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message});
    }
}

export default addProductsPresale;