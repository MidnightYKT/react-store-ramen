import React, { useState, useEffect, useContext, useRef } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import Skeleton from '../components/SneakerBlock/Skeleton'
import SneakerBlock from '../components/SneakerBlock/'
import Pagination from '../components/Pagination'
import { fetchSneaker, selectSneakerData } from '../redux/slices/sneakerSlice'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isMounted = useRef(false)

    const { items, status } = useSelector(selectSneakerData)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getSneaker = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchSneaker({
                sortBy,
                order,
                category,
                search,
                currentPage,
            })
        )

        window.scrollTo(0, 0)
    }

    //Если изменили параметры и был первый рендер
    useEffect(() => {
        // if (isMounted.current) {
        //     const queryString = qs.stringify({
        //         sortProperty: sort.sortProperty,
        //         categoryId,
        //         currentPage,
        //     })

        //     navigate(`?${queryString}`)
        // }
        // isMounted.current = true
        getSneaker()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    //Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1))

    //         const sort = sortList.find((obj) => obj.sortProperty == params.sortProperty)

    //         dispatch(
    //             setFilters({
    //                 ...params,
    //                 sort,
    //             })
    //         )
    //         // isSearch.current = true
    //     }
    // }, [])

    const pizzas = items.map((obj) => <SneakerBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    //Если был первый рендер, то запрашиваем пиццы
    // useEffect(() => {
    //     getSneaker()

    //     // if (!isSearch.current) {
    //     //     getSneaker()
    //     // }

    //     // isSearch.current = false
    // }, [categoryId, sort.sortProperty, searchValue, currentPage])

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                {status == 'error' ? (
                    <div className="content__error-info">
                        <h1>
                            <span>😔</span>
                            <br />
                            Произошла ошибка
                        </h1>
                        <p>К сожалению, не удалось получить пиццы</p>
                    </div>
                ) : (
                    <div className="content__items">{status == 'loading' ? skeletons : pizzas}</div>
                )}
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </>
    )
}

export default Home
