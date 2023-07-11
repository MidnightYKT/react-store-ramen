import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchSneakerParams, Sneaker } from './type'
import axios from 'axios'

export const fetchSneaker = createAsyncThunk<Sneaker[], SearchSneakerParams>(
    'sneaker/fetchSneakerStatus',
    async (params: Record<string, string>) => {
        const { sortBy, order, category, search, currentPage } = params
        const { data } = await axios.get<Sneaker[]>(
            `https://6421ee0c86992901b2bf51ae.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    }
)
