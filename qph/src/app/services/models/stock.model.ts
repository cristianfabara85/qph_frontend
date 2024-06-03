export class StockModel {

    idstock: number;
    idProduct: number;
    code: string;
    available: number;
    sold: number;
    purchased: number;

    constructor() {
        this.idstock = null;
        this.idProduct = null;
        this.code = null;
        this.available = 0.0;
        this.sold = 0.0;
        this.purchased = 0.0;
    }
}
