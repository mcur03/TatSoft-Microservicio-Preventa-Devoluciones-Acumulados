"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let validatorParams = [
    (0, express_validator_1.check)('id_detalle').isLength({ min: 1 }).withMessage('El id del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id válido').bail(),
    (0, express_validator_1.check)('id_producto').isLength({ min: 1 }).withMessage('El id del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de id válido').bail(),
    (0, express_validator_1.check)('cantidad').isLength({ min: 1 }).withMessage('la cantidad del producto debe contener mínimo 1 caracter').isNumeric().withMessage('Ingrese un número de cantidad válido').bail(),
];
function validator(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
exports.default = {
    validatorParams,
    validator
};
