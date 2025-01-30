"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let validatorParams = [
    (0, express_validator_1.check)('id_preventa').isLength({ min: 1 }).withMessage('El id del producto debe contener minimo un caracter').isNumeric().withMessage('Ingresa un número de id valido').bail()
];
function validator(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    next();
}
exports.default = {
    validatorParams,
    validator
};
