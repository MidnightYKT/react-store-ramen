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

export type Sneaker = {
    id: string
    name: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
}

export interface SneakerSliceState {
    items: Sneaker[]
    status: Status
}
