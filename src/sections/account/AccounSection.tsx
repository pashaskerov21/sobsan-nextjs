'use client'
import React, { Fragment } from 'react'
import { AlertComponent, Container, Section } from '@/src/styles'
import { AccountDataType, LoadingType, LocaleType, UserDataType } from '@/src/types'
import { AccountGeneralContainer } from './style'
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { AccountSidebar, AccountUpdateForm, OrderHistory, Skeleton } from '@/src/components'
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
    const [layoutState, setLayoutState] = React.useState<"account_settings" | "order_history">('account_settings');
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
    const changeLayout = React.useCallback((value: "account_settings" | "order_history") => {
        setLayoutState(value);
        closeMenu();
    }, [setLayoutState])


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
                Swal.fire({
                    icon: "success",
                    title: generalDictionary["congratulations"],
                    text: generalDictionary["delete_account_successfull"],
                })
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
                            loading={loading}
                            changeLayout={changeLayout}
                            layoutState={layoutState}
                        />
                    </div>
                    <div className="container__right">
                        <div className="container__right__header">
                            {
                                loading.lazy ?
                                    (
                                        <Fragment>
                                            <Skeleton width='170px' height='33px' />
                                            <Skeleton width='30px' height='30px' className='d-lg-none' />
                                        </Fragment>
                                    ) :
                                    (
                                        <Fragment>
                                            <div className="title">{generalDictionary[`${layoutState}`]}</div>
                                            <div className='account__menu__button' onClick={openMenu}>
                                                <HiOutlineBars3BottomRight />
                                            </div>
                                        </Fragment>
                                    )
                            }
                        </div>
                        <div className="container__right__body">
                            {layoutState === "account_settings" && (
                                <AccountUpdateForm
                                    activeLocale={activeLocale}
                                    activeUserData={activeUserData}
                                    collapseState={collapseState}
                                    formDictionary={formDictionary}
                                    generalDictionary={generalDictionary}
                                    handleCollapseButton={handleCollapseButton}
                                    loading={loading}
                                    titleDictionary={titleDictionary}
                                />
                            )}
                            {layoutState === 'order_history' && (
                                <Fragment>
                                    {
                                        activeUserData.orders.length > 0 ? (
                                            <OrderHistory
                                                activeLocale={activeLocale}
                                                activeUserData={activeUserData}
                                                generalDictionary={generalDictionary}
                                                loading={loading}
                                                titleDictionary={titleDictionary}
                                                orders={activeUserData.orders}
                                            />
                                        ) : (
                                            <Fragment>
                                                {
                                                    loading.standart ? <Skeleton width='100%' height='45px' radius='10px' /> : (
                                                        <AlertComponent>
                                                            {generalDictionary["no_order"]}
                                                        </AlertComponent>
                                                    )
                                                }
                                            </Fragment>
                                        )
                                    }
                                </Fragment>
                            )}
                        </div>
                    </div>
                </AccountGeneralContainer>
            </Container>
        </Section>
    )
}

export default React.memo(AccounSection)
