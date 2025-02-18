import { Request, Response } from "express";
import SalesService from "../../services/salesService";

const getAll_sales = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRole = req.body.role;
        const userId = req.body.id_usuario;

        const result =
            userRole === "COLABORADOR"
                ? await SalesService.getAllSalesColaborador(userId)
                : await SalesService.getAllSales();
        console.log('RESULT: ', result);
        

        if (!result) {
            res.status(404).json({ error: 'No hay ventas' });
            return;
        }

        res.status(200).json(result);
    } catch (error: any) {
        if (error && error.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            res.status(500).json({ error: "Error interno del servidor", details: error.message });
        }
    }
};

export default getAll_sales;
