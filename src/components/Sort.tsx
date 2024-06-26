import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sort, sortPropertyEnum } from '../redux/filter/type'
import { selectSort } from '../redux/filter/selectors'
import { setSort } from '../redux/filter/slice'

type SortItem = {
    name: string
    sortProperty: sortPropertyEnum
}

export const sortList: SortItem[] = [
    { name: 'Popularity (DESC)', sortProperty: sortPropertyEnum.RATING_DESC },
    { name: 'Popularity (ASC)', sortProperty: sortPropertyEnum.RATING_ASC },
    { name: 'Price (DESC)', sortProperty: sortPropertyEnum.PRICE_DESC },
    { name: 'Price (ASC)', sortProperty: sortPropertyEnum.PRICE_ASC },
    { name: 'Alphabetically (DESC)', sortProperty: sortPropertyEnum.TITLE_DESC },
    { name: 'Alphabetically (ASC)', sortProperty: sortPropertyEnum.TITLE_ASC },
]

type SortPopupProps = {
    value: Sort
}

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
    const dispatch = useDispatch()
    const sort = useSelector(selectSort)
    const sortRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)

    const onClickListItem = (obj: SortItem) => {
        dispatch(setSort(obj))
        setOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as MouseEvent & {
                path: Node[]
            }

            if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
                setOpen(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)

        return () => document.body.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sort by:</b>
                <span onClick={() => setOpen(!open)}>{value.name}</span>
            </div>
            <div className="sort__popup">
                {open && (
                    <ul>
                        {sortList.map((obj, i) => (
                            <li
                                key={i}
                                onClick={() => onClickListItem(obj)}
                                className={value.sortProperty == obj.sortProperty ? 'active' : ''}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
})

export default SortPopup
