class GetPresale {
    private _id_presale: string;
    
    constructor(
        id_presale: string,
    ) {
        this._id_presale = id_presale;    
    }   

    // Getter
    get id_presale(): string {
        return this._id_presale;
    }

    // Setters
    set id_presale(id_presale: string) {
        this._id_presale = id_presale;
    }    
};

export default GetPresale;