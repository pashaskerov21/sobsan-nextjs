import { AccountDataType, ComparisonDataType, ProductDataType } from "../types";


class Comparison {
    private comparisonStorage: ComparisonDataType[];
    private activeUserID: string | number | undefined;

    constructor(comparisonStorage: ComparisonDataType[], accountData: AccountDataType) {
        this.comparisonStorage = comparisonStorage;
        this.activeUserID = accountData.activeUser;
    }

    public clear() {
        let result: ComparisonDataType[];
        if (this.activeUserID) {
            result = this.comparisonStorage.filter((data) => data.user !== this.activeUserID);
        } else {
            result = this.comparisonStorage.filter((data) => data.user !== null);
        }
        return result;
    }
    public data() {
        let result: ComparisonDataType[];
        if (this.activeUserID) {
            result = this.comparisonStorage.filter((data) => data.user === this.activeUserID);
        } else {
            result = this.comparisonStorage.filter((data) => data.user === null);
        }
        return result;
    }
    public check(id: number) {
        const result: ComparisonDataType | undefined = this.data().find((data) => data.product === id);
        return result;
    }
    public remove(id: string | number) {
        const result: ComparisonDataType[] = this.comparisonStorage.filter((data) => data.id !== id);
        return result;
    }
    public add(data: ComparisonDataType) {
        const result: ComparisonDataType = {
            ...data,
            user: this.activeUserID ? this.activeUserID : null
        }
        return [...this.comparisonStorage, result];
    }
    public products(productData: ProductDataType[]) {
        const comparisonProducts: ProductDataType[] = this.comparisonStorage.map((c_data) =>
            productData.find((p_data) => p_data.id === c_data.product)).
            filter((p) => p !== undefined) as ProductDataType[];
        return comparisonProducts;
    }
}

export default Comparison;