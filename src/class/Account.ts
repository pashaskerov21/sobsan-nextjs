import { AccountDataType, UserDataType } from "../types";
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
    public updateUserData(id: string | number, updateData: UserDataType) {
        const updateUsers: UserDataType[] = this.users.map((data) => data.id === id ? updateData : data);
        const encryptedData: string[] = updateUsers.map((data) => this.encryptData(data));
        const updateAccountData: AccountDataType = {
            ...this.accountData,
            users: encryptedData,
        }
        return updateAccountData;
    }

}

export default Account;