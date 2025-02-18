"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetPresale {
    constructor(id_presale) {
        this._id_presale = id_presale;
    }
    // Getter
    get id_presale() {
        return this._id_presale;
    }
    // Setters
    set id_presale(id_presale) {
        this._id_presale = id_presale;
    }
}
;
exports.default = GetPresale;
