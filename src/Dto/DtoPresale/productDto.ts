class ProductDTO {
    private _id_producto: string;
    private _nombre_producto: string;
    private _precio: number;

    constructor(id_producto: string, nombre_producto: string, precio: number) {
        this._id_producto = id_producto;
        this._nombre_producto = nombre_producto;
        this._precio = precio;
    }

    // Getters
    get id_producto(): string {
        return this._id_producto;
    }

    get nombre_producto(): string {
        return this._nombre_producto;
    }

    get precio(): number {
        return this._precio;
    }

    // Setters
    set id_producto(value: string) {
        this._id_producto = value;
    }

    set nombre_producto(value: string) {
        this._nombre_producto = value;
    }

    set precio(value: number) {
        this._precio = value;
    }
}

export default ProductDTO;
