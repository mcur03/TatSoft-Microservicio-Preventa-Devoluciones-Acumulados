import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

let validatorParams =[
    check('id_detalle').isLength({min:1}).withMessage('El id del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id válido').bail(),
    check('id_producto').isLength({min:1}).withMessage('El id del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id válido').bail(),
    check('cantidad').isLength({min:1}).withMessage('la cantidad del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de cantidad válido').bail(),   
];

function validator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}




export default {
validatorParams,
validator
};