import { check, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export let validatorParamsUpdatePresale =[
    param('id_preventa').isLength({min:1}).withMessage('El id de la preventa debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id de preventa válido').bail(),
    check('id_producto').isLength({min:1}).withMessage('El id del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id de producto válido').bail(),
    check('cantidad').isLength({min:1}).withMessage('la cantidad del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de cantidad válido').bail(),   
];

export function validatorUpdatePresale(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}
