import { AccountDataType, OrderDataType, UserDataType } from "../types";
import CryptoJS from 'crypto-js';


class Account {
    private accountData: AccountDataType;
    private users: UserDataType[]

    constructor(accountData: AccountDataType) {
        this.accountData = accountData;
        this.users = this.accountData.users.map((data) => this.decryptData(data));
    }
    public encryptData(data: UserDataType) {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'your-secret-key').toString();
        return encryptedData;
    }
    public decryptData(key: string) {
        const bytes = CryptoJS.AES.decrypt(key, 'your-secret-key');
        const decryptedData: UserDataType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    public getUsers() {
        return this.users;
    }
    public searchUserByEmail(email: string) {
        let result: UserDataType | undefined = this.users.find((data) => data.account.email === email);
        return result;
    }
    public searchUserByID(id: string | number) {
        let result: UserDataType | undefined = this.users.find((data) => data.id === id);
        return result;
    }
    public searchUserByEmailPassword(email: string, password: string) {
        let result = this.users.find((data) => data.account.email === email && data.account.password === password);
        return result;
    }
    public registration(data: UserDataType) {
        const updateAccountData: AccountDataType = {
            ...this.accountData,
            users: [...this.accountData.users, this.encryptData(data)],
        }
        return updateAccountData;
    }
    public login(id: string | number) {
        const updateAccountData: AccountDataType = {
            ...this.accountData,
            activeUser: id,
        }
        return updateAccountData;
    }
    public updateUserData(updateData: UserDataType) {
        const updateUsers: UserDataType[] = this.users.map((data) => data.id === updateData.id ? updateData : data);
        const encryptedData: string[] = updateUsers.map((data) => this.encryptData(data));
        const updateAccountData: AccountDataType = {
            ...this.accountData,
            users: encryptedData,
        }
        return updateAccountData;
    }
    public getActiveUser() {
        let activeUserData: UserDataType | undefined;
        if (this.accountData.activeUser) {
            activeUserData = this.users.find((data) => data.id === this.accountData.activeUser);
        }
        return activeUserData
    }
    public getActiveOrder() {
        let activeOrder: OrderDataType | undefined;
        if (this.accountData.activeUser) {
            const activeUserData: UserDataType | undefined = this.getActiveUser();
            if (activeUserData && activeUserData.activeOrderID) {
                activeOrder = activeUserData.orders.find((data) => data.id === activeUserData.activeOrderID);
            }
        }
        return activeOrder;
    }
    public addNewOrder(newData: OrderDataType) {
        let activeUserData: UserDataType | undefined = this.getActiveUser();
        if (activeUserData) {
            activeUserData = {
                ...activeUserData,
                orders: [...activeUserData.orders.filter((data) => data.status), newData],
                activeOrderID: newData.id,
            }
            return this.updateUserData(activeUserData);
        }
        return this.accountData;
    }
    public updateOrderData(newData: OrderDataType) {
        let activeUserData: UserDataType | undefined = this.getActiveUser();
        if (activeUserData) {
            const updateOrders = activeUserData.orders.map((data) => data.id === activeUserData?.activeOrderID ? newData : data);
            activeUserData = {
                ...activeUserData,
                orders: updateOrders,
            }
            return this.updateUserData(activeUserData);
        }
        return this.accountData;
    }
    public logout() {
        const result: AccountDataType = {
            ...this.accountData,
            activeUser: undefined,
        }
        return result;
    }
    public remove() {
        const activeUser: UserDataType | undefined = this.getActiveUser();
        let updateUsers: UserDataType[] = this.users;
        if (activeUser) {
            updateUsers = this.users.filter((data) => data.id !== activeUser?.id)
        }
        const encryptUsers: string[] = updateUsers.map((data) => this.encryptData(data));

        const result: AccountDataType = {
            users: encryptUsers,
            activeUser: undefined
        }
        return result;
    }
}

export default Account;