class DetailRefundDTO {
    private _id_preventa: string;
    private _id_producto: string;
    private _cantidad: number;
    private _subtotal: number;

    constructor(
        id_preveta:string,
        id_producto:string,
        cantidad:number,
        subtotal:number
    ){
        this._id_preventa = id_preveta;
        this._id_producto = id_producto;
        this._cantidad = cantidad;
        this._subtotal = subtotal;
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

    get subtotal(){
        return this._subtotal
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
    
    set subtotal(subtotal:number){
        this._subtotal = subtotal;
    }
}

export default DetailRefundDTO;
