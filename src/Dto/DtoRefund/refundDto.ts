class RefundDTO{
    private _id_preventa: number;
    private _fecha_confirmacion: string;
    private _id_colaborador: number;
    private _id_cliente: number;
    private _total_devuelto: number;
    private _nombre_colaborador: string;
    private _razon_social: string;
    private _nombre_zona: string;

    constructor(
        id_preventa: number,
        fecha_confirmacion: string,
        id_colaborador: number,
        id_cliente: number,
        total_devuelto: number,
        nombre_colaborador: string,
        razon_social: string,
        nombre_zona: string             
        
        ){
        this._id_preventa = id_preventa;
        this._fecha_confirmacion = fecha_confirmacion;
        this._id_colaborador = id_colaborador;
        this._id_cliente = id_cliente;
        this._total_devuelto = total_devuelto;
        this._nombre_colaborador = nombre_colaborador;
        this._razon_social = razon_social;
        this._nombre_zona = nombre_zona;
    };

    //GETTERS
    get id_preventa():number{
        return this._id_preventa;
    }

    get fecha_confirmacion():string{
        return this._fecha_confirmacion;
    }

    get id_colaborador():number{
        return this._id_colaborador;
    }

    get id_cliente():number{
        return this._id_cliente;
    }

    get total_devuelto():number{
        return this._total_devuelto;
    }

    get nombre_colaborador():string{
        return this._nombre_colaborador;
    }
    get razon_social():string{
        return this._razon_social;
    }

    get nombre_zona():string{
        return this._nombre_zona;
    }

    //SETTERS
    set id_preventa(id_preventa:number){
        this._id_preventa = id_preventa;
    }

    set fecha_confirmacion(fecha_confirmacion:string){
        this._fecha_confirmacion = fecha_confirmacion;
    }

    set id_colaborador(id_colaborador:number){
        this._id_colaborador = id_colaborador;
    }

    set id_cliente(id_cliente:number){
        this._id_cliente = id_cliente;
    }

    set total_devuelto(total_devuelto:number){
        this._total_devuelto = total_devuelto;
    }

    set nombre_colaborador(nombre_colaborador: string){
        this._nombre_colaborador = nombre_colaborador;
    }

    set razon_social(razon_social:string){
        this._razon_social = razon_social;
    }

    set nombre_zona(nombre_zona:string){
        this._nombre_zona = nombre_zona;
    }
}

export default RefundDTO;


