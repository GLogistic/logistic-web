'use client'

import { useMemo, useState } from "react"

export const usePagination = (initPage?: number, initPageSize?: number) => {
    const [page, setPage] = useState<number>(initPage ?? 1);
    const [pageSize, setPageSize] = useState<number>(initPageSize ?? 1);
    const [totalSize, setTotalSize] = useState<number>(initPageSize ?? 1);
    const [totalPages, setTotalPages] = useState<number>(initPageSize ?? 1);

    const haveNext = useMemo(() => page < totalPages, [page, pageSize, totalSize, totalPages]);
    const havePrev = useMemo(() => page > 1, [page,     , totalSize, totalPages]);

    return {
        page,
        pageSize,
        totalSize,
        totalPages,
        haveNext,
        havePrev,
        setPage,
        setPageSize,
        setTotalSize,
        setTotalPages,
    }
}