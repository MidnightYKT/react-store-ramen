import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, sortPropertyEnum } from './type'

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'Popularity (DESC)',
        sortProperty: sortPropertyEnum.PRICE_DESC,
    },
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.categoryId = action.payload
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setSort: (state, action: PayloadAction<Sort>) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.sort = action.payload.sort
                state.currentPage = Number(action.payload.currentPage)
                state.categoryId = Number(action.payload.categoryId)
            } else {
                state.currentPage = 1
                state.categoryId = 0
                state.sort = {
                    name: 'Популярность',
                    sortProperty: sortPropertyEnum.RATING_DESC,
                }
            }
        },
    },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions

export default filterSlice.reducer
