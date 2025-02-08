import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export let validatorParamsIdDetallePresale = [
    check('id_preventa').isLength({min:1}).withMessage('El id debe contener minimo un caracter').isNumeric().withMessage('Ingresa un número de id valido').bail()
];

export function validatorIdDetallePresale(req:Request, res:Response, next:NextFunction):void{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({error: errors.array()});
        return;
    }
    next()
}