import CancelPresale from "../Dto/DtoPresale/cancelPresaleDto";
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

    static async getByIdPresale(getPresale: GetPresale){
        return await PresaleRepository.getById(getPresale)
    }

    static async deletePresale(deletePresale: DeletePresale){
        return await PresaleRepository.delete(deletePresale);
    }

    static async cancelPresale(cancelPresale: CancelPresale){
        return await PresaleRepository.cancel(cancelPresale);
    }

    static async updatePresale(updatePresale: UpdatePresale){
        return await PresaleRepository.update(updatePresale);
    }

    // funcion para obtener los ids de la preventa
    static async get_idsPresale(id_presale: string){
        return await PresaleRepository.getIdsPresale(id_presale);
    }
}

export default PresaleService;