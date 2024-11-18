'use client'

import { useState } from "react"

export const usePagination = (initPage?: number, initPageSize?: number) => {
    const [page, setPage] = useState<number>(initPage ?? 1);
    const [pageSize, setPageSize] = useState<number>(initPageSize ?? 1);

    return {
        page,
        pageSize,
        setPage,
        setPageSize
    }
}