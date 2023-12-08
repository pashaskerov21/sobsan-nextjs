'use client';
import React from 'react'
import { useSelector } from 'react-redux'
import { LocaleStateType, RootStateType } from '@/src/types'
import { LanguageDropdownWrapper } from './style';
import { BiChevronDown } from "react-icons/bi";
import Link from 'next/link';

const LanguageDropdown: React.FC<{ activeLocale: string }> = ({ activeLocale }) => {
  const localeStateData: LocaleStateType[] = useSelector((state: RootStateType) => state.localeState)
  return (
    <React.Fragment>
      <LanguageDropdownWrapper>
        <div className='active-value'>
          <div className='lang'>{activeLocale}</div>
          <div className='icon'><BiChevronDown /></div>
        </div>
        <div className="menu">
          {
            localeStateData.map((data) => (
              <React.Fragment key={data.locale}>
                <Link href={`/${data.locale}/${data.slug}`} locale={data.locale} className={activeLocale === data.locale ? 'd-none' : ''}>{data.locale}</Link>
              </React.Fragment>
            ))
          }
        </div>
      </LanguageDropdownWrapper>
    </React.Fragment>
  )
}

export default LanguageDropdown
