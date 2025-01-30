import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";

const getAll_presale = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRole = req.body.role;
        const userId = req.body.id_usuario;

        const result =
            userRole === "COLABORADOR"
                ? await PresaleService.getAllPresalesColaborador(userId)
                : await PresaleService.getAllPresales();

        // const result = await PresaleService.getAllPresales();
        res.status(200).json({ message: result });
    } catch (error: any) {
        if (error && error.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
};

export default getAll_presale;
