import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchRamenParams, Ramen } from './type'
import axios from 'axios'

export const fetchRamen = createAsyncThunk<
    { items: Ramen[]; totalCount: number },
    SearchRamenParams
>('sneaker/fetchSneakerStatus', async (params: Record<string, string>) => {
    const { sortBy, order, category, search, currentPage } = params
    
    // Запрос для получения товаров с пагинацией
    const { data, headers } = await axios.get<Ramen[]>(
        `https://6421ee0c86992901b2bf51ae.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    
    // Проверяем заголовок в разных регистрах (axios может преобразовывать заголовки)
    let totalCountHeader = headers['x-total-count'] || headers['X-Total-Count'] || headers['X-TOTAL-COUNT']
    
    // Если заголовок не получен, делаем запрос без пагинации для подсчета общего количества
    let totalCount: number
    if (totalCountHeader) {
        totalCount = parseInt(String(totalCountHeader), 10)
    } else {
        const { data: allData, headers: allHeaders } = await axios.get<Ramen[]>(
            `https://6421ee0c86992901b2bf51ae.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        totalCountHeader = allHeaders['x-total-count'] || allHeaders['X-Total-Count'] || allHeaders['X-TOTAL-COUNT']
        totalCount = totalCountHeader ? parseInt(String(totalCountHeader), 10) : allData.length
    }
    
    return { items: data, totalCount }
})
