import axios from "axios";
import dotenv from 'dotenv'

import EstatePresale from "../Dto/DtoPresale/EstatePresaleDto";
import DeletePresale from "../Dto/DtoPresale/deletePresaleDto";
import DetailsPresale from "../Dto/DtoPresale/detailsPresaleDto";
import GetPresale from "../Dto/DtoPresale/getPresaleDto";
import Presale from "../Dto/DtoPresale/presaleDto";
import UpdatePresale from "../Dto/DtoPresale/updatePresaleDto";
import PresaleRepository from "../repositories/presaleRepository";

dotenv.config()

class PresaleService{
    static async register_presale(presale:Presale, details:DetailsPresale[]){
        return await PresaleRepository.registerPresale(presale, details);
    }

    static async getAllPresales(){
        const presales = await PresaleRepository.getAll();
        return await this.populatePresalesWithNames(presales);
    }

    static async getAllPresalesColaborador(userId: number){
        const presales = await PresaleRepository.getAllColaborador(userId);
        return await this.populatePresalesWithNames(presales);
    }

// ----------------------------------------------------
    private static async populatePresalesWithNames(presales: any[]) {
        const updatedPresales = await Promise.all(
            presales.map(async (presale) => {
                try {
                    // Obtener el nombre del cliente
                    const clientResponse = await axios.get(
                        `${process.env.CLIENT_SERVICE_URL}${presale.id_cliente}`
                    );
                    
                    presale.nombre_cliente = clientResponse.data.nombre_completo_cliente;

                    // Obtener el nombre del colaborador
                    const userResponse = await axios.get(
                        `${process.env.USER_SERVICE_URL}${presale.id_colaborador}`
                    );
                    
                    presale.nombre_colaborador = userResponse.data.nombreCompleto;

                    return presale;
                } catch (error:any) {
                    console.error(`Error obteniendo nombres para preventa ${presale.id_preventa}:`, error.message);
                    return presale; // Devuelve el objeto original si falla la solicitud
                }
            })
        );

        return updatedPresales;
    }

    // ----------------------------------------------------------------------

    static async getByIdPresale(getPresale: GetPresale){
        const presales = await PresaleRepository.getById(getPresale)
        return await this.populatePresalesWithNames(presales);
    }

    static async getByIdPresaleColaborador(getPresale: GetPresale, id_colaborador: number){
        const presales = await PresaleRepository.getByIdColaborador(getPresale, id_colaborador)
        return await this.populatePresalesWithNames(presales);
    }

    static async deletePresale(deletePresale: DeletePresale){
        return await PresaleRepository.delete(deletePresale);
    }

    static async cancelPresale(cancelPresale: EstatePresale, id_colaborador: number){
        return await PresaleRepository.cancel(cancelPresale, id_colaborador);
    }

    static async confirmPresale(id_presale: string, returnedProductos: number[]){
        return await PresaleRepository.confirm(id_presale, returnedProductos);
    }

    static async updatePresale(updatePresale: UpdatePresale, id_colaborador: number){
        return await PresaleRepository.update(updatePresale, id_colaborador);
    }

    static async addProductsPresale(addProductsPresale: DetailsPresale[]){
        return await PresaleRepository.addProductsPresale(addProductsPresale);
    }

    // funcion para obtener los ids de la preventa
    static async get_idsPresale(id_presale: string){
        return await PresaleRepository.getIdsPresale(id_presale);
    }

    static async get_idsPresaleColaborador(id_presale: number, id_colaborador: number){
        return await PresaleRepository.getIdsPresaleColaborador(id_presale, id_colaborador);
    }
}

export default PresaleService;