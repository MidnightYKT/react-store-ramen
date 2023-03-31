import React, { useState, useEffect } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/SneakerBlock/Skeleton'
import SneakerBlock from '../components/SneakerBlock/'

const Home = ({ searchValue }) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'Популярности',
        sortProperty: 'rating',
    })
    console.log(items)

    const pizzas = items
        .filter((obj) => {
            if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return true
            }
            return false
        })
        .map((obj) => <SneakerBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''

        fetch(
            `https://6421ee0c86992901b2bf51ae.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue])

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
                    <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            </div>
        </>
    )
}

export default Home
