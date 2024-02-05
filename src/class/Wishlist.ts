import { AccountDataType, WishlistDataType } from "../types";


class Wishlist {
    private wishlistStorage: WishlistDataType[];
    private activeUserID: string | number | undefined;

    constructor(wishlistStorage: WishlistDataType[], accountData: AccountDataType) {
        this.wishlistStorage = wishlistStorage;
        this.activeUserID = accountData.activeUser;
    }

    public clear() {
        let result: WishlistDataType[];
        if (this.activeUserID) {
            result = this.wishlistStorage.filter((data) => data.user !== this.activeUserID);
        } else {
            result = this.wishlistStorage.filter((data) => data.user !== null);
        }
        return result;
    }

    public data() {
        let result: WishlistDataType[];
        if (this.activeUserID) {
            result = this.wishlistStorage.filter((data) => data.user === this.activeUserID);
        } else {
            result = this.wishlistStorage.filter((data) => data.user === null);
        }
        return result;
    }
    public check(id: number) {
        const result: WishlistDataType | undefined = this.data().find((data) => data.product === id);
        return result;
    }
    public remove(id: string | number) {
        const result: WishlistDataType[] = this.wishlistStorage.filter((data) => data.id !== id);
        return result;
    }
    public add(data: WishlistDataType){
        const result: WishlistDataType = {
            ...data,
            user: this.activeUserID ? this.activeUserID : null
        }
        return [...this.wishlistStorage, result];
    }
}

export default Wishlist;