import { AccountDataType, BasketDataType } from "../types";


class Basket {
    private basketStorage: BasketDataType[];
    private accountData: AccountDataType;
    private activeUserID: string | number | undefined;

    constructor(basketStorage: BasketDataType[], accountData: AccountDataType) {
        this.basketStorage = basketStorage;
        this.accountData = accountData;
        this.activeUserID = accountData.activeUser;
    }

    public clear() {
        let result: BasketDataType[];
        if (this.activeUserID) {
            result = this.basketStorage.filter((data) => data.user !== this.activeUserID);
        } else {
            result = this.basketStorage.filter((data) => data.user !== null);
        }
        return result;
    }

    public data() {
        let result: BasketDataType[];
        if (this.activeUserID) {
            result = this.basketStorage.filter((data) => data.user === this.activeUserID);
        } else {
            result = this.basketStorage.filter((data) => data.user === null);
        }
        return result;
    }
    public getDataByProductId(id: number) {
        const result: BasketDataType | undefined = this.basketStorage.find((data) => data.product === id);
        return result;
    }
    public remove(id: string | number) {
        const result: BasketDataType[] = this.basketStorage.filter((data) => data.id !== id);
        return result;
    }
    public updateAmount(id: string | number, amount: number) {
        const result: BasketDataType[] = this.basketStorage.map((data) => data.id === id ? {
            ...data,
            parameters: {
                ...data.parameters,
                amount: amount,
            }
        } : data);
        return result;
    }
    public add(data: BasketDataType){
        return [...this.basketStorage, data];
    }
}

export default Basket;