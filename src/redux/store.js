import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import sneaker from './slices/sneakerSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: { filter, cart, sneaker },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
