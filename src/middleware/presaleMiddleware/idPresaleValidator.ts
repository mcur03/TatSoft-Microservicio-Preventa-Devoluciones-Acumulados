import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export let validatorParamsIdPresale = [
    check('id_presale').isLength({min:1}).withMessage('El id de la id_presale debe contener minimo un caracter').isNumeric().withMessage('Ingresa un número de id de preventa valido').bail()
];

export function validatorIdPresale(req:Request, res:Response, next:NextFunction):void{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({error: errors.array()});
        return;
    }
    next()
}