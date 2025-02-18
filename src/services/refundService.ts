import axios from "axios";
import RefundRepository from "../repositories/refundRepository";
import GetRefundDTO from "../Dto/DtoRefund/getRefundDto";

class RefundService{

    static async getAllRefund(){
        const refunds =  await RefundRepository.getAll();

        for (const refund of refunds) {
            try {
                // Obtener datos del colaborador (usuario)
                const userResponse = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${refund.id_colaborador}`);;
                console.log('USERRRRRRRRRR: ', userResponse.data);
                
                refund.nombre_colaborador = userResponse.data;

                // Obtener datos del cliente y zona
                const clientResponse = await axios.get(`http://localhost:10102/api/client/${refund.id_cliente}`);
                console.log('DATACLIENT:', clientResponse.data);
                refund.razon_social = clientResponse.data.razon_social;
                refund.nombre_zona = clientResponse.data.zona;
            } catch (error) {
                console.error("Error obteniendo datos de otros microservicios:", error);
            }
        }

        return refunds;
    }

    static async getAllRefundColaborador(userId: number){
        const refunds = await RefundRepository.getAllColaborador(userId);

        for (const refund of refunds) {
            try {
                // Obtener datos del colaborador (usuario)
                const userResponse = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${refund.id_colaborador}`);;
                
                refund.nombre_colaborador = userResponse.data.nombreCompleto;

                // Obtener datos del cliente y zona
                const clientResponse = await axios.get(`http://localhost:10102/api/client/${refund.id_cliente}`);
                refund.razon_social = clientResponse.data.razon_social;
                refund.nombre_zona = clientResponse.data.zona;
            } catch (error) {
                console.error("Error obteniendo datos de otros microservicios:", error);
            }
        }

        return refunds;
    }

    static async getRefundDetails(id_presale: string) {
        return await RefundRepository.getRefundDetails(id_presale)
    }

    static async getRefundDetailsColaborador(id_presale: string, userId:string) {
        return await RefundRepository.getRefundDetailsColaborador(id_presale, userId);
    }

    static async getByIdRefund(getRefund: GetRefundDTO){
        return await RefundRepository.getById(getRefund);
    }

    static async getByIdRefundColaborador(getReund: GetRefundDTO, id_colaborador: number){
        return await RefundRepository.getByIdColaborador(getReund, id_colaborador)
    }
}

export default RefundService;
