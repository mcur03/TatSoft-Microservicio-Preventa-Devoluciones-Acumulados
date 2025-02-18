class GetDetailsPresale {
    private _id_detailPresale: string;
    
    constructor(
        id_detailPresale: string,
    ) {
        this._id_detailPresale = id_detailPresale;    
    }   

    // Getter
    get id_detailPresale(): string {
        return this._id_detailPresale;
    }

    // Setters
    set id_detailPresale(id_detailPresale: string) {
        this._id_detailPresale = id_detailPresale;
    }    
};

export default GetDetailsPresale;