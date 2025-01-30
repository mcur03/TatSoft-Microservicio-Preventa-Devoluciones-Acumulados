import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

// Ajustamos la interfaz JwtPayload para reflejar el payload del token
interface JwtPayload {
    contraseña: string;
    cedula: string;
    role: string;
    id_usuario: number;
    iat: number;
    exp: number;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let authorization = req.get('Authorization');    
    if (authorization) {
        const token = authorization.split(' ')[1];
        
        if (!token) {
            res.status(401).json({
                status: 'No ha enviado un token'
            });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            
            req.body.cedula = decoded.cedula;
            req.body.role = decoded.role;
            req.body.contraseña = decoded.contraseña;
            req.body.id_usuario = decoded.id_usuario;

            next(); 
        } catch (error) {
            res.status(403).json({
                status: 'Unauthorized',
                error: (error as Error).message // Mensaje de error detallado
            });
            return;
        }
    } else {
        res.status(403).json({
            status: "El token es obligatorio"
        });
        return;
    }
}

export default verifyToken;
