import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'

import styles from './Search.module.scss'

const Search = ({ searchValue, setSearchValue }) => {
    return (
        <div className={styles.root}>
            <AiOutlineSearch className={styles.icon} size={20} />
            <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />
            {searchValue && (
                <IoMdClose onClick={() => setSearchValue('')} className={styles.clear} size={20} />
            )}
        </div>
    )
}

export default Search
