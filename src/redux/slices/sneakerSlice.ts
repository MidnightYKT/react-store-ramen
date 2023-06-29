import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { Sort } from './filterSlice'

export enum Status {
    LOADING = 'loading',
    SUCCES = 'success',
    ERROR = 'error',
}

export type SearchSneakerParams = {
    sortBy: string
    order: string
    category: string
    search: string
    currentPage: string
}

type Sneaker = {
    id: string
    name: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
}

interface SneakerSliceState {
    items: Sneaker[]
    status: Status
}

const initialState: SneakerSliceState = {
    items: [],
    status: Status.LOADING,
}

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

export const sneakerSlice = createSlice({
    name: 'sneaker',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSneaker.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchSneaker.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCES
        })
        builder.addCase(fetchSneaker.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
    },

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchSneaker.pending, (state) => {
    //             state.status = 'loading'
    //             state.items = []
    //         })
    //         .addCase(fetchSneaker.fulfilled, (state, action) => {
    //             state.items = action.payload
    //             state.status = 'success'
    //         })
    //         .addCase(fetchSneaker.rejected, (state) => {
    //             state.status = 'error'
    //             state.items = []
    //         })
    // }
})

export const selectSneakerData = (state: RootState) => state.sneaker

export const { setItems } = sneakerSlice.actions

export default sneakerSlice.reducer
