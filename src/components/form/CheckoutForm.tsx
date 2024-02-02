'use client'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { AccountDataType, LoadingType, LocaleType, UserDataType } from '@/src/types'
import { decryptData } from '@/src/utils/crypto'
import { useLocalStorage } from 'usehooks-ts'

type CheckoutFormProps = {
    activeLocale: LocaleType,
    loading: LoadingType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

type CheckoutFormValuesType = {
    firstName: string,
    lastName: string,
    address: string,
    phone: string | number,
    email: string,
    note: string,
    payment_type: "card" | "cash",
    delivery_type: "city" | "region",
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    activeLocale,
    formDictionary,
    generalDictionary,
    loading,
    titleDictionary,
}) => {
    const [accountData, setAccountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const usersData: UserDataType[] = accountData.users.map((data) => decryptData(data));
    const [activeUser, setActiveUser] = useState<UserDataType | undefined>();
    useEffect(() => {
        if (accountData.activeUser) {
            setActiveUser(usersData.find((data) => data.id === accountData.activeUser));
        }
    }, [accountData.activeUser])
    const initialValues: CheckoutFormValuesType = {
        firstName: activeUser ? activeUser.profile.firstName : '',
        lastName: activeUser ? activeUser.profile.lastName : '',
        address: activeUser ? activeUser.profile.address ? activeUser.profile.address : '' : '',
        phone: activeUser ? activeUser.profile.phone : '',
        email: activeUser ? activeUser.account.email : '',
        note: '',
        payment_type: 'cash',
        delivery_type: 'city',
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required(`${formDictionary.error.firstName_required}`),
        lastName: Yup.string().required(`${formDictionary.error.lastName_required}`),
        phone: Yup.string().required(`${formDictionary.error.phone_required}`),
        email: Yup.string().email(`${formDictionary.error.email_format}`).required(`${formDictionary.error.email_required}`),
    });
    return (
        <div>

        </div>
    )
}

export default React.memo(CheckoutForm)
