import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchRamenParams, Ramen } from './type'
import axios from 'axios'

export const fetchRamen = createAsyncThunk<Ramen[], SearchRamenParams>(
    'sneaker/fetchSneakerStatus',
    async (params: Record<string, string>) => {
        const { sortBy, order, category, search, currentPage } = params
        const { data } = await axios.get<Ramen[]>(
            `https://6421ee0c86992901b2bf51ae.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    }
)
