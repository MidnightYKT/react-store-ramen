import React, { useContext, useRef, useState, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'

import { SearchContext } from '../../App'

import styles from './Search.module.scss'

const Search = () => {
    const [value, setValue] = useState('')
    const { setSearchValue } = useContext(SearchContext)
    const inputRef = useRef()

    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 250),
        []
    )

    const onChangeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <AiOutlineSearch className={styles.icon} size={20} />
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />
            {value && <IoMdClose onClick={onClickClear} className={styles.clear} size={20} />}
        </div>
    )
}

export default Search
