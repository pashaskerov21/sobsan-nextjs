'use client'
import React from 'react'
import { SearchProps } from '@/src/types'
import { SearchFormWrapper } from './style'
import { IoIosSearch } from 'react-icons/io'

const Search: React.FC<SearchProps> = ({
    headerState,
    titleDictionary,
    toggleSearch,
}) => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    return (
        <SearchFormWrapper>
            <div className='search-icon' onClick={toggleSearch}><IoIosSearch /></div>
            <div className={`input-row ${headerState.searchShow ? 'active' : ''}`}>
                <input type="text" placeholder={titleDictionary.search} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button type='submit'>
                    <IoIosSearch />
                </button>
            </div>
        </SearchFormWrapper>
    )
}

export default React.memo(Search);
