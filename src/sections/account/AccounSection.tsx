'use client'
import React from 'react'
import { Container, Section } from '@/src/styles'
import { AccountDataType, LoadingType, LocaleType, UserDataType } from '@/src/types'
import { AccountGeneralContainer } from './style'
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { FaXmark } from 'react-icons/fa6'
import { AccountSidebar } from '@/src/components'
import { useLocalStorage } from 'usehooks-ts'
import { Account } from '@/src/class'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

type SectionProps = {
    activeLocale: LocaleType,
    activeUserData: UserDataType,
    loading: LoadingType,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
    formDictionary: {
        [key: string]: {
            [key: string]: string
        }
    },
}

const AccounSection: React.FC<SectionProps> = ({
    activeLocale,
    activeUserData,
    formDictionary,
    generalDictionary,
    loading,
    titleDictionary,
}) => {
    const body = document.querySelector('body');
    const router = useRouter();
    const [menu, setMenu] = React.useState<boolean>(false);
    const [accountData, setAccountData] = useLocalStorage<AccountDataType>('accounts', {
        activeUser: undefined,
        users: [],
    });
    const account = new Account(accountData);
    const [collapseState, setCollapseState] = React.useState<{
        account: boolean,
        order: boolean,
        list: boolean,
        profile_info: boolean,
        account_info: boolean,
        delivery_info: boolean,
    }>({
        account: true,
        order: true,
        list: true,
        profile_info: true,
        account_info: true,
        delivery_info: true,
    });
    const openMenu = React.useCallback(() => {
        setMenu(true);
        if (body) {
            body.style.overflow = "hidden";
        }
    }, [menu]);
    const closeMenu = React.useCallback(() => {
        setMenu(false);
        if (body) {
            body.style.overflow = "visible";
        }
    }, [menu]);
    const handleCollapseButton = React.useCallback((key: 'account' | 'order' | 'list' | 'profile_info' | 'account_info' | 'delivery_info') => {
        setCollapseState((prev) => {
            return {
                ...prev,
                [key]: !prev[key],
            }
        })
    }, [setCollapseState]);


    const handleRemoveAccount = () => {
        Swal.fire({
            icon: "warning",
            title: generalDictionary["attention"],
            text: generalDictionary["delete_account_warning"],
            showDenyButton: true,
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonText: generalDictionary["yes"],
            denyButtonText: generalDictionary["no"],
            cancelButtonText: generalDictionary["cancel"]
        }).then((result) => {
            if (result.isConfirmed) {
                setAccountData(account.remove());
                router.push(`/${activeLocale}/login`);
            } else if (result.isDenied) {
                router.push(`/${activeLocale}/account`);
            }
        });
    }
    const handleLogout = () => {
        Swal.fire({
            icon: "warning",
            title: generalDictionary["attention"],
            text: generalDictionary["logout_warning"],
            showDenyButton: true,
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonText: generalDictionary["yes"],
            denyButtonText: generalDictionary["no"],
            cancelButtonText: generalDictionary["cancel"]
        }).then((result) => {
            if (result.isConfirmed) {
                setAccountData(account.logout());
                router.push(`/${activeLocale}/login`);
            } else if (result.isDenied) {
                router.push(`/${activeLocale}/account`);
            }
        });
    }



    React.useEffect(() => {
        if (body) {
            body.style.overflow = "visible";
        }
    }, []);
    return (
        <Section $py={20}>
            <Container>
                <AccountGeneralContainer>
                    <div className="container__left">
                        <AccountSidebar
                            activeLocale={activeLocale}
                            activeUserData={activeUserData}
                            closeMenu={closeMenu}
                            menu={menu}
                            generalDictionary={generalDictionary}
                            collapseState={collapseState}
                            handleCollapseButton={handleCollapseButton}
                            titleDictionary={titleDictionary}
                            handleRemoveAccount={handleRemoveAccount}
                            handleLogout={handleLogout}
                        />
                    </div>
                    <div className="container__right">
                        <div className="container__right__header">
                            <div className="title">{generalDictionary["account_settings"]}</div>
                            <div className='account__menu__button' onClick={openMenu}>
                                <HiOutlineBars3BottomRight />
                            </div>
                        </div>
                    </div>
                </AccountGeneralContainer>
            </Container>
        </Section>
    )
}

export default React.memo(AccounSection)
