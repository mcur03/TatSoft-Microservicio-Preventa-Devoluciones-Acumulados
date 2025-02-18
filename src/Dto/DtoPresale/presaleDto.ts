class Presale{
    private _estado: string;
    private _total: number;
    private _id_cliente: string;
    private _id_colaborador: number;

    constructor(
        estado:string,
        total:number,
        id_cliente:string,
        id_colaborador:number
    ){
        this._estado = estado;
        this._total = total;
        this._id_cliente = id_cliente;
        this._id_colaborador = id_colaborador;
    }

    //getter
    get estado():string{
        return this._estado;
    }

    get total():number{
        return this._total;
    }

    get id_cliente():string{
        return this._id_cliente;
    }

    get id_colaborador():number{
        return this._id_colaborador
    }

    // setter
    set estado(estado:string){
        this._estado = estado;
    }

    set total(total:number){
        this._total = total;
    }

    set id_cliente(id_cliente:string){
        this._id_cliente = id_cliente;
    }

    set id_colaborador(id_colaborador:number){
        this._id_colaborador = id_colaborador;
    }
}

export default Presale;