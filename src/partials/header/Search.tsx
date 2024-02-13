'use client'
import React from 'react'
import { SearchFormWrapper } from './style'
import { IoIosSearch } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { HeaderStateType } from './Header'
import { LocaleType } from '@/src/types'

export type SearchProps = {
    activeLocale: LocaleType,
    headerState: HeaderStateType,
    toggleSearch: () => void,
    titleDictionary: { [key: string]: string },
    generalDictionary: { [key: string]: string },
};

const Search: React.FC<SearchProps> = ({
    activeLocale,
    headerState,
    titleDictionary,
    toggleSearch,
}) => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/${activeLocale}/search?query=${encodeURIComponent(searchValue)}`);
        setSearchValue('');
        toggleSearch();
    }
    return (
        <SearchFormWrapper method='get' onSubmit={onSubmit} autoComplete="off">
            <div className='search-icon' onClick={toggleSearch}><IoIosSearch /></div>
            <div className={`input-row ${headerState.searchShow ? 'active' : ''}`}>
                <input type="text" name='search' placeholder={titleDictionary.search} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button type='submit'>
                    <IoIosSearch />
                </button>
            </div>
        </SearchFormWrapper>
    )
}

export default React.memo(Search);
