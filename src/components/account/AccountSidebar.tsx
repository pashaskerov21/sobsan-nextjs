import { LoadingType, LocaleType, UserDataType } from '@/src/types'
import React, { Fragment } from 'react'
import { Collapse } from 'react-bootstrap'
import { FaXmark } from 'react-icons/fa6'
import { FaChevronDown } from "react-icons/fa";
import Link from 'next/link';
import Skeleton from '../skeleton/Skeleton';

type SidebarProps = {
  activeLocale: LocaleType,
  activeUserData: UserDataType,
  loading: LoadingType,
  menu: boolean,
  generalDictionary: { [key: string]: string },
  titleDictionary: { [key: string]: string },
  layoutState: "account_settings" | "order_history",
  collapseState: {
    account: boolean,
    order: boolean,
    list: boolean,
    profile_info: boolean,
    account_info: boolean,
    delivery_info: boolean,
  },
  closeMenu: () => void,
  handleCollapseButton: (key: 'account' | 'order' | 'list' | 'profile_info' | 'account_info' | 'delivery_info') => void,
  changeLayout: (value: "account_settings" | "order_history") => void,
  handleRemoveAccount: () => void,
  handleLogout: () => void,
}

const AccountSidebar: React.FC<SidebarProps> = ({
  activeLocale,
  activeUserData,
  closeMenu,
  menu,
  generalDictionary,
  titleDictionary,
  collapseState,
  handleCollapseButton,
  handleRemoveAccount,
  handleLogout,
  loading,
  changeLayout,
  layoutState,
}) => {

  return (
    <Fragment>
      {menu && <div className="black-backdrop" onClick={closeMenu}></div>}
      <div className={`account__sidebar ${menu ? 'active' : ''}`}>
        <div className="account__sidebar__header">
          <div className="title">{activeUserData.profile.firstName} {activeUserData.profile.lastName}</div>
          <div className="close__button" onClick={closeMenu}><FaXmark /></div>
        </div>
        <div className="account__sidebar__body">
          {
            loading.lazy ? (
              <Fragment>
                <div className="account__collapse">
                  <Skeleton width='100%' height='55px' margin='0 0 1px 0' />
                  <Skeleton width='100%' height='50px' margin='0 0 1px 0' />
                  <Skeleton width='100%' height='50px' margin='0 0 1px 0' />
                  <Skeleton width='100%' height='50px' margin='0 0 1px 0' />
                </div>
                <div className="account__collapse">
                  <Skeleton width='100%' height='55px' margin='0 0 1px 0' />
                </div>
                <div className="account__collapse">
                  <Skeleton width='100%' height='55px' margin='0 0 1px 0' />
                  <Skeleton width='100%' height='50px' margin='0 0 1px 0' />
                  <Skeleton width='100%' height='50px' margin='0 0 1px 0' />
                  <Skeleton width='100%' height='50px' margin='0 0 1px 0' />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="account__collapse">
                  <div className="account__collapse__button" onClick={() => handleCollapseButton('account')}>
                    <div className="title">{generalDictionary["my_account"]}</div>
                    <div className="arrow__button">
                      <FaChevronDown />
                    </div>
                  </div>
                  <Collapse in={collapseState.account}>
                    <div className="account__collapse__inner">
                      <div className="service__rows">
                        <div className={`service__row ${layoutState === "account_settings" ? 'active' : ''}`} onClick={() => changeLayout("account_settings")}>
                          <div className="title">{generalDictionary["account_settings"]}</div>
                        </div>
                        <div className="service__row" onClick={handleRemoveAccount}>
                          <div className="title">
                            {generalDictionary["delete_account"]}
                          </div>
                        </div>
                        <div className="service__row" onClick={handleLogout}>
                          <div className="title">{generalDictionary["logout"]}</div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="account__collapse">
                  <div className="account__collapse__button" onClick={() => handleCollapseButton('order')}>
                    <div className="title">{generalDictionary["orders"]}</div>
                    <div className="arrow__button">
                      <FaChevronDown />
                    </div>
                  </div>
                  <Collapse in={collapseState.order}>
                    <div className="account__collapse__inner">
                      <div className="service__rows">
                        <div className={`service__row ${layoutState === "order_history" ? 'active' : ''}`} onClick={() => changeLayout("order_history")}>
                          <div className="title">{generalDictionary["order_history"]}</div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="account__collapse">
                  <div className="account__collapse__button" onClick={() => handleCollapseButton('list')}>
                    <div className="title">{generalDictionary["lists"]}</div>
                    <div className="arrow__button">
                      <FaChevronDown />
                    </div>
                  </div>
                  <Collapse in={collapseState.order}>
                    <div className="account__collapse__inner">
                      <div className="service__rows">
                        <Link href={`/${activeLocale}/basket`} className="service__row">
                          <div className="title">{titleDictionary["basket"]}</div>
                        </Link>
                        <Link href={`/${activeLocale}/wishlist`} className="service__row">
                          <div className="title">{titleDictionary["wishlist"]}</div>
                        </Link>
                        <Link href={`/${activeLocale}/comparisons`} className="service__row">
                          <div className="title">{titleDictionary["comparisons"]}</div>
                        </Link>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </Fragment>
            )
          }
        </div>
      </div>
    </Fragment>
  )
}

export default React.memo(AccountSidebar)
