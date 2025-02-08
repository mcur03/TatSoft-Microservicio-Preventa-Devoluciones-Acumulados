import EstatePresale from "../Dto/DtoPresale/EstatePresaleDto";
import DeletePresale from "../Dto/DtoPresale/deletePresaleDto";
import DetailsPresale from "../Dto/DtoPresale/detailsPresaleDto";
import GetPresale from "../Dto/DtoPresale/getPresaleDto";
import Presale from "../Dto/DtoPresale/presaleDto";
import UpdatePresale from "../Dto/DtoPresale/updatePresaleDto";
import PresaleRepository from "../repositories/presaleRepository";

class PresaleService{
    static async register_presale(presale:Presale, details:DetailsPresale[]){
        return await PresaleRepository.registerPresale(presale, details);
    }

    static async getAllPresales(){
        return await PresaleRepository.getAll()
    }

    static async getAllPresalesColaborador(userId: number){
        return await PresaleRepository.getAllColaborador(userId);
    }

    static async getByIdPresale(getPresale: GetPresale){
        return await PresaleRepository.getById(getPresale)
    }

    static async getByIdPresaleColaborador(getPresale: GetPresale, id_colaborador: number){
        return await PresaleRepository.getByIdColaborador(getPresale, id_colaborador)
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

    static async get_idsPresaleColaborador(id_presale: string, id_colaborador: number){
        return await PresaleRepository.getIdsPresaleColaborador(id_presale, id_colaborador);
    }
}

export default PresaleService;