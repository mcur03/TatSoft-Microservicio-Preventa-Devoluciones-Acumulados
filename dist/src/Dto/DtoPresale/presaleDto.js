"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Presale {
    constructor(estado, total, id_cliente, id_colaborador) {
        this._estado = estado;
        this._total = total;
        this._id_cliente = id_cliente;
        this._id_colaborador = id_colaborador;
    }
    //getter
    get estado() {
        return this._estado;
    }
    get total() {
        return this._total;
    }
    get id_cliente() {
        return this._id_cliente;
    }
    get id_colaborador() {
        return this._id_colaborador;
    }
    // setter
    set estado(estado) {
        this._estado = estado;
    }
    set total(total) {
        this._total = total;
    }
    set id_cliente(id_cliente) {
        this._id_cliente = id_cliente;
    }
    set id_colaborador(id_colaborador) {
        this._id_colaborador = id_colaborador;
    }
}
exports.default = Presale;
