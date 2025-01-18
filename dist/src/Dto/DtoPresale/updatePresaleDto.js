"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatePresale {
    constructor(id_detalle, id_producto, cantidad) {
        this._id_detalle = id_detalle;
        this._id_producto = id_producto;
        this._cantidad = cantidad;
    }
    //getter
    get id_detalle() {
        return this._id_detalle;
    }
    get id_producto() {
        return this._id_producto;
    }
    get cantidad() {
        return this._cantidad;
    }
    // setter
    set id_detalle(id_detalle) {
        this._id_detalle = id_detalle;
    }
    set id_producto(id_producto) {
        this._id_producto = id_producto;
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
}
exports.default = UpdatePresale;
