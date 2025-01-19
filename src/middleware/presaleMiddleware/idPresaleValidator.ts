import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

let validatorParams = [
    check('id_preventa').isLength({min:1}).withMessage('El id del producto debe contener minimo un caracter').isNumeric().withMessage('Ingresa un número de id valido').bail()
];

function validator(req:Request, res:Response, next:NextFunction){
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return res.status(422).json({error: errors.array()})
    }
    next()
}

export default{
    validatorParams,
    validator
}