"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorUpdatePresale = exports.validatorParamsUpdatePresale = void 0;
const express_validator_1 = require("express-validator");
exports.validatorParamsUpdatePresale = [
    (0, express_validator_1.param)('id_preventa').isLength({ min: 1 }).withMessage('El id de la preventa debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id de preventa válido').bail(),
    (0, express_validator_1.check)('id_producto').isLength({ min: 1 }).withMessage('El id del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id de producto válido').bail(),
    (0, express_validator_1.check)('cantidad').isLength({ min: 1 }).withMessage('la cantidad del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de cantidad válido').bail(),
];
function validatorUpdatePresale(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}
exports.validatorUpdatePresale = validatorUpdatePresale;
