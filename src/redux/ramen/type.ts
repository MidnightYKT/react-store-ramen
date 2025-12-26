export enum Status {
    LOADING = 'loading',
    SUCCES = 'success',
    ERROR = 'error',
}

export type SearchRamenParams = {
    sortBy: string
    order: string
    category: string
    search: string
    currentPage: string
}

export type Ramen = {
    id: string
    name: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
}

export interface RamenSliceState {
    items: Ramen[]
    status: Status
    totalCount: number
}
