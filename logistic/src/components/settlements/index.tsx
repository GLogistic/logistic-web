'use client'

import { useDeleteSettlement, useGetSettlements, useInvalidateGetSettlements } from '@/api/entities/settlement.api';
import { ISettlement } from '@/interfaces/entity/settlement.interface';
import { useState, useEffect, ChangeEvent } from 'react';
import { usePagination } from '../helpers/use-pagination.helper';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { PrimaryButton } from '../buttons/primaryButton';
import { PrimaryInput } from '../inputs/primaryInput';
import { IPaginationParams } from '@/interfaces/params/pagination-params.interface';
import { HeaderParams } from '@/enums/header-params.enum';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteEntityModal } from '../modals/deleteEntityModal';
import { ModalWithOverlay } from '../modals/modalWithOverlay';
import { UpdateSettlementForm } from '../forms/entities/update/settlement';
import { useInvalidateGetRoutes } from '@/api/entities/route.api';
import { CreateSettlementForm } from '../forms/entities/create/settlement';

export const Settlements = () => {
    const [settlements, setSettlements] = useState<ISettlement[]>([]);

    const [titleFilter, setTitleFilter] = useState<string>('');

    const [isOpenDeleteModals, setIsOpenDeleteModals] = useState<boolean[]>([]);
    const [isOpenUpdateModals, setIsOpenUpdateModals] = useState<boolean[]>([]);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

    const setOpenDeleteModalByIndex = (index: number, value: boolean) => {
        const newIsOpenDeleteModals = [...isOpenDeleteModals];

        newIsOpenDeleteModals[index] = value;

        setIsOpenDeleteModals(newIsOpenDeleteModals);
    }

    const setOpenUpdateModalByIndex = (index: number, value: boolean) => {
        const newIsOpenUpdateModals = [...isOpenUpdateModals];

        newIsOpenUpdateModals[index] = value;

        setIsOpenUpdateModals(newIsOpenUpdateModals);
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
    
    const { data } = useGetSettlements({page, pageSize, titleFilter});

    const invalidateGetQuery = useInvalidateGetSettlements(queryClient);
    const invalidateGetRoutesQuery = useInvalidateGetRoutes(queryClient);

    const onSuccessAction = async () => {
        await invalidateGetQuery();
        await invalidateGetRoutesQuery();
        setIsOpenDeleteModals(Array(isOpenDeleteModals.length).fill(false));
        setIsOpenUpdateModals(Array(isOpenDeleteModals.length).fill(false));
        setIsOpenCreateModal(false);
    }

    const deleteCargoMutation = useDeleteSettlement({
        onSuccess: onSuccessAction,
    });

    useEffect(() => {
        if (!data || !data!.headers)
            return;

        if (data.status == 204) {
            setSettlements([]);
            return;
        }

        const paginationParamsString = data!.headers[HeaderParams.Pagination] ?? '{}';
        const paginationParams = JSON.parse(paginationParamsString) as IPaginationParams;

        setPage(paginationParams.currentPage);
        setPageSize(paginationParams.pageSize);
        setTotalSize(paginationParams.totalSize);
        setTotalPages(paginationParams.totalPages);

        setSettlements(data.data ?? [])
        
        setIsOpenDeleteModals(Array(data.data.length ?? 0).fill(false));
        setIsOpenUpdateModals(Array(data.data.length ?? 0).fill(false));
    }, [data]); 

    return (
        <>
        <div className={styles.mainContainer}>
            <div className={styles.tableHelper}>
                    <PrimaryButton
                    onClick={() => setIsOpenCreateModal(true)}
                    >
                        Create
                    </PrimaryButton>
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
                                    Title
                                </p>
                                <div className={styles.titleFilter}>
                                    <PrimaryInput
                                    inputContainerClassName={styles.titleInputContainer}
                                    placeholder='Enter title...'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setTitleFilter(e.target.value ?? '');
                                    }}
                                    />
                                </div>
                            </div>
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {settlements && settlements.map((settlement, idx) => (
                        <tr key={`settlement-${idx}`}>
                            <td className={styles.cell}>{settlement.title}</td>
                            <td className={clsx(styles.cell, styles.actionButtonsCell)}>
                                <PrimaryButton
                                onClick={() => setOpenDeleteModalByIndex(idx, true)}
                                >
                                    Delete
                                </PrimaryButton>
                                <PrimaryButton
                                onClick={() => setOpenUpdateModalByIndex(idx, true)}
                                >
                                    Update
                                </PrimaryButton>

                                <DeleteEntityModal
                                isOpen={isOpenDeleteModals[idx]}
                                entityTitle={settlement.title}
                                onClose={() => setOpenDeleteModalByIndex(idx, false)}
                                onDelete={async () => {
                                    await deleteCargoMutation.mutateAsync({ id: settlement.id });
                                }}
                                />

                                <ModalWithOverlay
                                isOpen={isOpenUpdateModals[idx]}
                                onClose={() => setOpenUpdateModalByIndex(idx, false)}
                                >
                                    <UpdateSettlementForm
                                    initialState={settlement}
                                    onSucces={onSuccessAction}
                                    />
                                </ModalWithOverlay>
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
        <ModalWithOverlay
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
        >
            <CreateSettlementForm
            onSucces={onSuccessAction}
            />
        </ModalWithOverlay>
        </>
    );
};