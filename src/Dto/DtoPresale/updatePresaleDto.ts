class UpdatePresale{
    private _id_detalle: string;
    private _id_producto: string;
    private _cantidad: number;

    constructor(
        id_detalle:string,
        id_producto:string,
        cantidad:number
    ){
        this._id_detalle = id_detalle;
        this._id_producto = id_producto;
        this._cantidad = cantidad;
    }

    //getter
    get id_detalle():string{
        return this._id_detalle;
    }
    
    get id_producto():string{
        return this._id_producto;
    }

    get cantidad():number{
        return this._cantidad;
    }

    // setter
    set id_detalle(id_detalle:string){
        this._id_detalle = id_detalle;
    }
    
    set id_producto(id_producto:string){
        this._id_producto = id_producto;
    }
    
    set cantidad(cantidad:number){
        this._cantidad = cantidad;
    }
}

export default UpdatePresale;