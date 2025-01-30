import { check, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validatorParams = [
    check('id_cliente')
        .isInt({ gt: 0 })
        .withMessage('El ID del cliente debe ser un número entero positivo')
        .bail(),

    body('detalles')
        .isArray({ min: 1 })
        .withMessage('Debe incluir al menos un detalle en la preventa')
        .bail(),

    body('detalles.*.id_producto')
        .isInt({ gt: 0 })
        .withMessage('El ID del producto debe ser un número entero positivo')
        .bail(),

    body('detalles.*.cantidad')
        .isInt({ gt: 0 })
        .withMessage('La cantidad debe ser un número entero positivo')
        .bail(),
];

export function validator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}