import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import axios from "axios";
import DetailsPresaleDTO from "../../Dto/DtoPresale/detailsPresaleDto";
import ProductDTO from "../../Dto/DtoPresale/productDto";
import DetailPresaleDTO from "../../Dto/DtoPresale/detailPresaleDto";

import dotenv from 'dotenv';

dotenv.config();

let get_detailsPresale = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRole = req.body.role;
        const userId = req.body.id_usuario;
        const { id_preventa } = req.params;
        // console.log('ID INGRESADO: ', id_preventa);

        const result =
            userRole === "COLABORADOR"
                ? await PresaleService.get_idsPresaleColaborador(Number(id_preventa), userId)
                : await PresaleService.get_idsPresale(id_preventa);

        // const presale = await PresaleService.get_idsPresale(id_presale, userId);
        if (!result) {
            res.status(404).json({ error: 'Preventa no encontrada' });
            return;
        }

        // console.log('RESPUESTA PRESALE: ', result);

        if (!result.id_cliente || !result.id_colaborador) {
            res.status(400).json({ error: 'Datos de la preventa incompletos' });
            return;
        }

        // Obtener datos del cliente
        const client = await axios.get(`${process.env.CLIENT_SERVICE_URL}${result.id_cliente}`);
        console.log('CLIENTE: ', client.data);
        
        // Obtener datos de todos los productos
        const ids = result.detalle.map((d: DetailsPresaleDTO) => d.id_producto).join(',');
        const products = await axios.get(`${process.env.PRODUCT_SERVICE_URL}${ids}`);
        console.log('PRODUCTOS: ', products.data);

        // Obtener datos del colaborador-usuario
        const user = await axios.get(`${process.env.USER_SERVICE_URL}${result.id_colaborador}`);
        console.log('USER: ', user.data);
 

        
        // Construir la respuesta final
        res.status(200).json({
            id_preventa: result.id_preventa,
            cliente: {
                nombre: client.data.nombre_completo_cliente,
                direccion: client.data.direccion,
                telefono: client.data.telefono,
                razon_social: client.data.razon_social,
            },
            colaborador: {
                nombre: user.data.nombreCompleto,
            },
            productos: result.detalle.map((d: DetailPresaleDTO) => {
                const producto = products.data.find((p: ProductDTO) => p.id_producto === d.id_producto);
                // console.log('PRODUCTOS: result.DETALLE.MAP: ', producto);
                
                return {
                    nombre: producto?.nombre_producto || 'Producto no encontrado',
                    precio: producto?.precio || 0,
                    cantidad: d.cantidad,
                    subtotal: d.subtotal,
                };
            }),
            total: result.total,
            estado: result.estado,
        });
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              res.status(404).json({ message: 'La información no existe' });
            }
            res.status(error.response?.status || 500).json({ message: 'Error en el microservicio productos, clientes o usuarios' });
          }
      
          console.error(error);
          res.status(500).json({ message: 'Error en el servidor' });
    }
};

export default get_detailsPresale;