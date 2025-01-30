class DetailPresaleDTO {
    private _id_producto: string;
    private _cantidad: number;
    private _subtotal: number;
    private _state: string;

    constructor(id_producto: string, cantidad: number, subtotal: number, state: string) {
        this._id_producto = id_producto;
        this._cantidad = cantidad;
        this._subtotal = subtotal;
        this._state = state;
    }

    // Getters
    get id_producto(): string {
        return this._id_producto;
    }

    get cantidad(): number {
        return this._cantidad;
    }

    get subtotal(): number {
        return this._subtotal;
    }

    get state(): string {
        return this._state;
    }
    // Setters
    set id_producto(value: string) {
        this._id_producto = value;
    }

    set cantidad(value: number) {
        this._cantidad = value;
    }

    set subtotal(value: number) {
        this._subtotal = value;
    }

    set state(state: string) {
        this._state = state;
    }
}

export default DetailPresaleDTO;
