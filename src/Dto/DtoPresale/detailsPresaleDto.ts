class DetailsPresale{
    private _id_preventa: string;
    private _id_producto: string;
    private _cantidad: number;

    constructor(
        id_preveta:string,
        id_producto:string,
        cantidad:number
    ){
        this._id_preventa = id_preveta;
        this._id_producto = id_producto;
        this._cantidad = cantidad;
    }

    //getter
    get id_preventa():string{
        return this._id_preventa;
    }
    
    get id_producto():string{
        return this._id_producto;
    }

    get cantidad():number{
        return this._cantidad;
    }

    //setter
    set id_preventa(id_preventa:string){
        this._id_preventa = id_preventa;
    }
    
    set id_producto(id_producto:string){
        this._id_producto = id_producto;
    }
    
    set cantidad(cantidad:number){
        this._cantidad = cantidad;
    }
}

export default DetailsPresale;