import { Request, Response } from "express";
import PresaleService from "../../services/presaleService";
import axios from "axios";
import DetailsPresaleDTO from "../../Dto/DtoPresale/detailsPresaleDto";
import ProductDTO from "../../Dto/DtoPresale/productDto";
import DetailPresaleDTO from "../../Dto/DtoPresale/detailPresaleDto";

let get_detailsPresale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_presale } = req.params;
        console.log('ID INGRESADO: ', id_presale);

        // Consultar los datos locales de la preventa
        const presale = await PresaleService.get_idsPresale(id_presale);
        if (!presale) {
            res.status(404).json({ error: 'Preventa no encontrada' });
            return;
        }

        console.log('RESPUESTA PRESALE: ', presale);

        if (!presale.id_cliente || !presale.id_colaborador) {
            res.status(400).json({ error: 'Datos de la preventa incompletos' });
            return;
        }

        // Obtener datos del cliente
        const client = await axios.get(`http://localhost:10102/api/client/${presale.id_cliente}`);
        console.log('CLIENTE: ', client.data);
        
        // Obtener datos del colaborador-usuario
        const user = await axios.get(`http://localhost:10101/api/usuarios/id_usuario/${presale.id_colaborador}`);
        console.log('USER: ', user.data);
        
        // Obtener datos de todos los productos
        const ids = presale.detalle.map((d: DetailsPresaleDTO) => d.id_producto).join(',');
        const products = await axios.get(`http://localhost:10104/api/products?ids=${ids}`);
        console.log('PRODUCTOS: ', products.data);
        
        // Construir la respuesta final
        res.status(200).json({
            id_preventa: presale.id_preventa,
            cliente: {
                nombre: client.data.nombre_completo_cliente,
                direccion: client.data.direccion,
                telefono: client.data.telefono,
                razon_social: client.data.razon_social,
            },
            colaborador: {
                nombre: user.data,
            },
            productos: presale.detalle.map((d: DetailPresaleDTO) => {
                const producto = products.data.products.find((p: ProductDTO) => p.id_producto === d.id_producto);
                console.log('PRODUCTOS: PRESALE.DETALLE.MAP: ', producto);
                
                return {
                    nombre: producto?.nombre_producto || 'Producto no encontrado',
                    precio: producto?.precio || 0,
                    cantidad: d.cantidad,
                    subtotal: d.subtotal,
                };
            }),
            total: presale.total,
            estado: presale.estado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de la preventa' });
    }
};

export default get_detailsPresale;