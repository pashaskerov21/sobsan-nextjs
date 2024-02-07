import { AccountDataType, BasketDataType } from "../types";


class Basket {
    private basketStorage: BasketDataType[];
    private activeUserID: string | number | undefined;

    constructor(basketStorage: BasketDataType[], accountData: AccountDataType) {
        this.basketStorage = basketStorage;
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
    public check(id: number) {
        const result: BasketDataType | undefined = this.data().find((data) => data.product === id);
        return result;
    }
    public remove(id: string | number) {
        const result: BasketDataType[] = this.basketStorage.filter((data) => data.id !== id);
        return result;
    }
    public update(id: string | number, amount: number) {
        const result: BasketDataType[] = this.basketStorage.map((data) => data.id === id ? {
            ...data,
            parameters: {
                ...data.parameters,
                amount: amount,
                total: amount * data.parameters.price,
            }
        } : data);
        return result;
    }
    public add(data: BasketDataType){
        const result: BasketDataType = {
            ...data,
            user: this.activeUserID ? this.activeUserID : null
        }
        return [...this.basketStorage, result];
    }
}

export default Basket;