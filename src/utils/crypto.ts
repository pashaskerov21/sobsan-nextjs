import { UserDataType } from "../types";
import CryptoJS from 'crypto-js';


export const encryptData = (data: UserDataType) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'your-secret-key').toString();
    return encryptedData;
};

export const decryptData = (encryptedData:any) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'your-secret-key');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};