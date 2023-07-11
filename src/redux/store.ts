import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice'
import cart from './cart/slice'
import sneaker from './sneaker/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: { filter, cart, sneaker },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
