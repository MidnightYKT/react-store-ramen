import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationProps = {
    currentPage: number
    onChangePage: (page: number) => void
    pageCount: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, pageCount }) => {
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={8}
                pageCount={pageCount || 1}
                previousLabel="<"
                forcePage={currentPage - 1}
            />
        </div>
    )
}

export default Pagination
