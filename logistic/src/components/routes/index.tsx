'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { usePagination } from '../helpers/use-pagination.helper';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { PrimaryButton } from '../buttons/primaryButton';
import Link from 'next/link';
import { PrimaryInput } from '../inputs/primaryInput';
import { IPaginationParams } from '@/interfaces/pagination-params.interface';
import { HeaderParams } from '@/enums/header-params.enum';
import { IRoute } from '@/interfaces/entity/route.interface';
import { useGetRoutes } from '@/api/get-routes.api';

export const Routes = () => {
    const [routes, setRoutes] = useState<IRoute[]>([]);

    const [startSettlementTitleFilter, setStartSettlementTitleFilter] = useState<string>('');

    const searchParams = useSearchParams();
    
    const { 
        page, 
        pageSize,
        haveNext,
        havePrev,
        setPage,
        setPageSize,
        setTotalSize,
        setTotalPages,
    } = usePagination(
        Number(searchParams.get('page')),
        Number(searchParams.get('pageSize'))
    );
    
    const { data } = useGetRoutes({page, pageSize, startSettlementTitleFilter});

    useEffect(() => {
        if (!data || !data!.headers)
            return;

        if (data.status == 204) {
            setRoutes([]);
            return;
        }

        const paginationParamsString = data!.headers[HeaderParams.Pagination] ?? '{}';
        const paginationParams = JSON.parse(paginationParamsString) as IPaginationParams;

        setPage(paginationParams.currentPage);
        setPageSize(paginationParams.pageSize);
        setTotalSize(paginationParams.totalSize);
        setTotalPages(paginationParams.totalPages);

        setRoutes(data.data ?? [])
    }, [data]); 

    return (
        <div className={styles.mainContainer}>
            <div className={styles.tableHelper}>
                    <PrimaryInput
                    className={styles.pageSizeInput}
                    type='number'
                    placeholder='Enter page size...'
                    min={1}
                    max={50}
                    label='Page size'
                    value={pageSize}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPageSize(Number(e.target.value));
                    }}
                    />
            </div>
            <table className={styles.entityTable}>
                <thead>
                    <tr>
                        <th
                        style={{ padding: '0px' }}
                        >
                            <div className={clsx(styles.cell, styles.headerCellWithFilter)}>
                                <p>
                                    Start settlement
                                </p>
                                <div className={styles.titleFilter}>
                                    <PrimaryInput
                                    inputContainerClassName={styles.titleInputContainer}
                                    placeholder='Enter title...'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setStartSettlementTitleFilter(e.target.value ?? '');
                                    }}
                                    />
                                </div>
                            </div>
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            End settlement
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Distance
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {routes && routes.map((route, idx) => 
                    route && route.startSettlement && route.endSettlement && (
                        <tr key={`route-${idx}`}>
                            <td className={styles.cell}>{route.startSettlement.title}</td>
                            <td className={styles.cell}>{route.endSettlement.title}</td>
                            <td className={styles.cell}>{route.distance}</td>
                            <td className={clsx(styles.cell, styles.actionButtonsCell)}>
                                <PrimaryButton>
                                    Delete
                                </PrimaryButton>
                                <PrimaryButton>
                                    <Link href={'/'}>Update</Link>
                                </PrimaryButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <PrimaryButton
                disabled={!havePrev}
                onClick={() => setPage(prev => prev - 1)}
                >
                    Previous
                </PrimaryButton>

                <span className={styles.currentPage}>{page}</span>
                <PrimaryButton
                disabled={!haveNext}
                onClick={() => setPage(prev => prev  + 1)}
                >
                    Next
                </PrimaryButton>
            </div>
        </div>
    );
};