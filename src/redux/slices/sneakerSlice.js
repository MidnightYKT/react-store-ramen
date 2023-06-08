import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSneaker = createAsyncThunk('sneaker/fetchSneakerStatus', async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get(
        `https://6421ee0c86992901b2bf51ae.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
})

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

export const sneakerSlice = createSlice({
    name: 'sneaker',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSneaker.pending, (state) => {
                state.status = 'loading'
                state.items = []
            })
            .addCase(fetchSneaker.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = 'success'
            })
            .addCase(fetchSneaker.rejected, (state) => {
                state.status = 'error'
                state.items = []
            })
    },
})

export const { setItems } = sneakerSlice.actions

export default sneakerSlice.reducer
