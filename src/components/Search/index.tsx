import React, { useRef, useState, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'

import styles from './Search.module.scss'
import { setSearchValue } from '../../redux/filter/slice'

const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setSearchValue('')
        setValue('')
        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 150),
        []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                placeholder="Search for Ramen..."
            />
            {value && <IoMdClose onClick={onClickClear} className={styles.clear} size={20} />}
        </div>
    )
}

export default Search
