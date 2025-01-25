import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import axios from "axios";
import DetailsPresaleDTO from "../../Dto/DtoPresale/detailsPresaleDto";
import ProductDTO from "../../Dto/DtoPresale/productDto";
import DetailPresaleDTO from "../../Dto/DtoPresale/detailPresaleDto";

let get_detailsPresale = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRole = req.body.role;
        const userId = req.body.id_usuario;
        const { id_presale } = req.params;
        console.log('ID INGRESADO: ', id_presale);

        const result =
            userRole === "COLABORADOR"
                ? await PresaleService.get_idsPresaleColaborador(id_presale, userId)
                : await PresaleService.get_idsPresale(id_presale);

        // const presale = await PresaleService.get_idsPresale(id_presale, userId);
        if (!result) {
            res.status(404).json({ error: 'Preventa no encontrada' });
            return;
        }

        console.log('RESPUESTA PRESALE: ', result);

        if (!result.id_cliente || !result.id_colaborador) {
            res.status(400).json({ error: 'Datos de la preventa incompletos' });
            return;
        }

        // Obtener datos del cliente
        const client = await axios.get(`http://localhost:10102/api/client/${result.id_cliente}`);
        console.log('CLIENTE: ', client.data);
        
        // Obtener datos del colaborador-usuario
        const user = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${result.id_colaborador}`);
        console.log('USER: ', user.data);
        
        // Obtener datos de todos los productos
        const ids = result.detalle.map((d: DetailsPresaleDTO) => d.id_producto).join(',');
        const products = await axios.get(`http://localhost:10104/api/products?ids=${ids}`);
        console.log('PRODUCTOS: ', products.data);
        
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
                nombre: user.data,
            },
            productos: result.detalle.map((d: DetailPresaleDTO) => {
                const producto = products.data.products.find((p: ProductDTO) => p.id_producto === d.id_producto);
                console.log('PRODUCTOS: result.DETALLE.MAP: ', producto);
                
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de la preventa' });
    }
};

export default get_detailsPresale;