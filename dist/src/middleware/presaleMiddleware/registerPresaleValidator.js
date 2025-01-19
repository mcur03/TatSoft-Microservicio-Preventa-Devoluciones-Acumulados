"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.validatorParams = void 0;
const express_validator_1 = require("express-validator");
exports.validatorParams = [
    (0, express_validator_1.check)('id_cliente')
        .isInt({ gt: 0 })
        .withMessage('El ID del cliente debe ser un número entero positivo')
        .bail(),
    (0, express_validator_1.check)('id_colaborador')
        .isInt({ gt: 0 })
        .withMessage('El ID del colaborador debe ser un número entero positivo')
        .bail(),
    (0, express_validator_1.body)('detalles')
        .isArray({ min: 1 })
        .withMessage('Debe incluir al menos un detalle en la preventa')
        .bail(),
    (0, express_validator_1.body)('detalles.*.id_producto')
        .isInt({ gt: 0 })
        .withMessage('El ID del producto debe ser un número entero positivo')
        .bail(),
    (0, express_validator_1.body)('detalles.*.cantidad')
        .isInt({ gt: 0 })
        .withMessage('La cantidad debe ser un número entero positivo')
        .bail(),
];
function validator(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
}
exports.validator = validator;
