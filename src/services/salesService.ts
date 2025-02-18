import axios from "axios";
import SalesRepository from "../repositories/salesRepository";
import GetSale from "../Dto/DtoSales/getSaleDto";

class SalesService{

    static async getAllSales(){
        const sales =  await SalesRepository.getAll()

        for (const sale of sales) {
            try {
                // Obtener datos del colaborador (usuario)
                const userResponse = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${sale.id_colaborador}`);;
                
                sale.nombre_colaborador = userResponse.data;

                // Obtener datos del cliente y zona
                const clientResponse = await axios.get(`http://localhost:10102/api/client/${sale.id_cliente}`);
                sale.razon_social = clientResponse.data.razon_social;
                sale.nombre_zona = clientResponse.data.zona;
            } catch (error) {
                console.error("Error obteniendo datos de otros microservicios:", error);
            }
        }

        return sales;
    }

    static async getAllSalesColaborador(userId: number){
        const sales = await SalesRepository.getAllColaborador(userId);

        for (const sale of sales) {
            try {
                // Obtener datos del colaborador (usuario)
                const userResponse = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${sale.id_colaborador}`);;
                console.log('USERRRRRRRRRR: ', userResponse.data);
                
                sale.nombre_colaborador = userResponse.data;

                // Obtener datos del cliente y zona
                const clientResponse = await axios.get(`http://localhost:10102/api/client/${sale.id_cliente}`);
                console.log('DATACLIENT:', clientResponse.data);
                sale.razon_social = clientResponse.data.razon_social;
                sale.nombre_zona = clientResponse.data.zona;
            } catch (error) {
                console.error("Error obteniendo datos de otros microservicios:", error);
            }
        }

        return sales;
    }

    static async getSaleDetails(id_presale: string) {
        return await SalesRepository.getSaleDetails(id_presale);
    }

    static async getSaleDetailsColaborador(id_presale: string, userId:string) {
        return await SalesRepository.getSaleDetailsColaborador(id_presale, userId);
    }

    static async getByIdSale(getSale: GetSale){
        return await SalesRepository.getById(getSale);
    }

    static async getByIdSaleColaborador(getSale: GetSale, id_colaborador: number){
        return await SalesRepository.getByIdColaborador(getSale, id_colaborador)
    }
}

export default SalesService;
