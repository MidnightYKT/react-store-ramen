import { createSlice } from '@reduxjs/toolkit'
import { SearchRamenParams, Ramen, RamenSliceState, Status } from './type'
import { fetchRamen } from './asyncActions'

const initialState: RamenSliceState = {
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
        builder.addCase(fetchRamen.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchRamen.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCES
        })
        builder.addCase(fetchRamen.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
    },
})

export const { setItems } = sneakerSlice.actions

export default sneakerSlice.reducer
