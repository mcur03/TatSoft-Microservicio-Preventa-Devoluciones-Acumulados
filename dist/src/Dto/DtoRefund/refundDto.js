"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RefundDTO {
    constructor(id_preventa, fecha_confirmacion, id_colaborador, id_cliente, total_devuelto, nombre_colaborador, razon_social, nombre_zona) {
        this._id_preventa = id_preventa;
        this._fecha_confirmacion = fecha_confirmacion;
        this._id_colaborador = id_colaborador;
        this._id_cliente = id_cliente;
        this._total_devuelto = total_devuelto;
        this._nombre_colaborador = nombre_colaborador;
        this._razon_social = razon_social;
        this._nombre_zona = nombre_zona;
    }
    ;
    //GETTERS
    get id_preventa() {
        return this._id_preventa;
    }
    get fecha_confirmacion() {
        return this._fecha_confirmacion;
    }
    get id_colaborador() {
        return this._id_colaborador;
    }
    get id_cliente() {
        return this._id_cliente;
    }
    get total_devuelto() {
        return this._total_devuelto;
    }
    get nombre_colaborador() {
        return this._nombre_colaborador;
    }
    get razon_social() {
        return this._razon_social;
    }
    get nombre_zona() {
        return this._nombre_zona;
    }
    //SETTERS
    set id_preventa(id_preventa) {
        this._id_preventa = id_preventa;
    }
    set fecha_confirmacion(fecha_confirmacion) {
        this._fecha_confirmacion = fecha_confirmacion;
    }
    set id_colaborador(id_colaborador) {
        this._id_colaborador = id_colaborador;
    }
    set id_cliente(id_cliente) {
        this._id_cliente = id_cliente;
    }
    set total_devuelto(total_devuelto) {
        this._total_devuelto = total_devuelto;
    }
    set nombre_colaborador(nombre_colaborador) {
        this._nombre_colaborador = nombre_colaborador;
    }
    set razon_social(razon_social) {
        this._razon_social = razon_social;
    }
    set nombre_zona(nombre_zona) {
        this._nombre_zona = nombre_zona;
    }
}
exports.default = RefundDTO;
