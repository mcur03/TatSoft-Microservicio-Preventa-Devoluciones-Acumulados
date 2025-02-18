"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePresale {
    constructor(id_preventa, id_producto, cantidad) {
        this._id_preventa = id_preventa;
        this._id_producto = id_producto;
        this._cantidad = cantidad;
    }
    //getter
    get id_preventa() {
        return this._id_preventa;
    }
    get id_producto() {
        return this._id_producto;
    }
    get cantidad() {
        return this._cantidad;
    }
    // setter
    set id_preventa(id_preventa) {
        this._id_preventa = id_preventa;
    }
    set id_producto(id_producto) {
        this._id_producto = id_producto;
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
}
exports.default = UpdatePresale;
