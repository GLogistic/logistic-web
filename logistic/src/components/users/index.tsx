'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { usePagination } from '../helpers/use-pagination.helper';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { PrimaryButton } from '../buttons/primaryButton';
import { PrimaryInput } from '../inputs/primaryInput';
import { IPaginationParams } from '@/interfaces/params/pagination-params.interface';
import { HeaderParams } from '@/enums/header-params.enum';
import { useDeleteUser, useGetUsers, useInvalidateGetUsers } from '@/api/entities/user.api';
import { IUser } from '@/interfaces/entity/user.interface';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteEntityModal } from '../modals/deleteEntityModal';
import { ModalWithOverlay } from '../modals/modalWithOverlay';
import { UpdateUserForm } from '../forms/entities/update/user';

export const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    const [isOpenDeleteModals, setIsOpenDeleteModals] = useState<boolean[]>([]);
    const [isOpenUpdateModals, setIsOpenUpdateModals] = useState<boolean[]>([]);

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
    
    const { data } = useGetUsers({page, pageSize});

    const invalidateGetQuery = useInvalidateGetUsers(queryClient);

    const onSuccessAction = async () => {
        await invalidateGetQuery();
        setIsOpenDeleteModals(Array(isOpenDeleteModals.length).fill(false));
        setIsOpenUpdateModals(Array(isOpenDeleteModals.length).fill(false));
    }

    const deleteCargoMutation = useDeleteUser({
        onSuccess: onSuccessAction,
    });

    useEffect(() => {
        if (!data || !data!.headers)
            return;

        if (data.status == 204) {
            setUsers([]);
            return;
        }

        const paginationParamsString = data!.headers[HeaderParams.Pagination] ?? '{}';
        const paginationParams = JSON.parse(paginationParamsString) as IPaginationParams;

        setPage(paginationParams.currentPage);
        setPageSize(paginationParams.pageSize);
        setTotalSize(paginationParams.totalSize);
        setTotalPages(paginationParams.totalPages);

        setUsers(data.data ?? [])
        
        setIsOpenDeleteModals(Array(data.data.length ?? 0).fill(false));
        setIsOpenUpdateModals(Array(data.data.length ?? 0).fill(false));
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
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            First name
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Last name
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            User name
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Email
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, idx) => (
                        <tr key={`user-${idx}`}>
                            <td className={styles.cell}>{`${user.firstName}`}</td>
                            <td className={styles.cell}>{`${user.lastName}`}</td>
                            <td className={styles.cell}>{`${user.userName}`}</td>
                            <td className={styles.cell}>{user.email}</td>
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
                                entityTitle={user.userName}
                                onClose={() => setOpenDeleteModalByIndex(idx, false)}
                                onDelete={async () => {
                                    await deleteCargoMutation.mutateAsync({ id: user.id });
                                }}
                                />
                                
                                <ModalWithOverlay
                                isOpen={isOpenUpdateModals[idx]}
                                onClose={() => setOpenUpdateModalByIndex(idx, false)}
                                >
                                    <UpdateUserForm
                                    initialState={user}
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
    );
};