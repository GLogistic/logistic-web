'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { usePagination } from '../helpers/use-pagination.helper';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { PrimaryButton } from '../buttons/primaryButton';
import Link from 'next/link';
import { PrimaryInput } from '../inputs/primaryInput';
import { IPaginationParams } from '@/interfaces/params/pagination-params.interface';
import { HeaderParams } from '@/enums/header-params.enum';
import { IRoute } from '@/interfaces/entity/route.interface';
import { useDeleteRoute, useGetRoutes, useInvalidateGetRoutes } from '@/api/entities/route.api';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteEntityModal } from '../modals/deleteEntityModal';

export const Routes = () => {
    const [routes, setRoutes] = useState<IRoute[]>([]);

    const [startSettlementTitleFilter, setStartSettlementTitleFilter] = useState<string>('');

    const [isOpenDeleteModals, setIsOpenDeleteModals] = useState<boolean[]>([]);

    const setOpenDeleteModalByIndex = (index: number, value: boolean) => {
        const newIsOpenDeleteModals = [...isOpenDeleteModals];

        newIsOpenDeleteModals[index] = value;

        setIsOpenDeleteModals(newIsOpenDeleteModals);
    }

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
    
    const queryClient = useQueryClient();
    
    const { data } = useGetRoutes({page, pageSize, startSettlementTitleFilter});
    
    const invalidateGetQuery = useInvalidateGetRoutes(queryClient);

    const onSuccessDelete = async () => {
        await invalidateGetQuery();

        const newIsOpenDeleteModals = Array(isOpenDeleteModals.length).fill(false);
        setIsOpenDeleteModals(newIsOpenDeleteModals);
    }

    const deleteRouteMutation = useDeleteRoute({
        onSuccess: onSuccessDelete,
    });

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
        
        setIsOpenDeleteModals(Array(data.data.length ?? 0).fill(false));
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
                                <PrimaryButton
                                onClick={() => setOpenDeleteModalByIndex(idx, true)}
                                >
                                    Delete
                                </PrimaryButton>
                                <PrimaryButton>
                                    <Link href={'/'}>Update</Link>
                                </PrimaryButton>

                                <DeleteEntityModal
                                isOpen={isOpenDeleteModals[idx]}
                                entityTitle={`${route.startSettlement.title} -> ${route.endSettlement.title} ${route.distance}km`}
                                onClose={() => setOpenDeleteModalByIndex(idx, false)}
                                onDelete={async () => {
                                    await deleteRouteMutation.mutateAsync({ id: route.id });
                                }}
                                />
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