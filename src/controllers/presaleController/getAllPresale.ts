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

        if(result.length === 0){
            res.status(404).json({error: 'No hay registros'})
            return;
        }
        // const result = await PresaleService.getAllPresales();
        console.log('RESULLLLT:', result);
        
        res.status(200).json({ result });
    } catch (error: any) {
        if (error && error.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
};

export default getAll_presale;
