"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesDTO {
    constructor(id_preventa, fecha_confirmacion, id_colaborador, id_cliente, total_vendido, nombre_colaborador, razon_social, nombre_zona) {
        this._id_preventa = id_preventa;
        this._fecha_confirmacion = fecha_confirmacion;
        this._id_colaborador = id_colaborador;
        this._id_cliente = id_cliente;
        this._total_vendido = total_vendido;
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
    get total_vendido() {
        return this._total_vendido;
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
    set total_vendido(total_vendido) {
        this._total_vendido = total_vendido;
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
exports.default = SalesDTO;
