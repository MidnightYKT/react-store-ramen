import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SearchSneakerParams, Sneaker, SneakerSliceState, Status } from '../sneaker/type'
import { fetchSneaker } from './asyncActions'

const initialState: SneakerSliceState = {
    items: [],
    status: Status.LOADING,
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
})

export const { setItems } = sneakerSlice.actions

export default sneakerSlice.reducer
