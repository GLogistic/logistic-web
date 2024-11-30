'use client'

import { useGetSettlements } from '@/api/get-settlements.api';
import { ISettlement } from '@/interfaces/entity/settlement.interface';
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
import { ICargo } from '@/interfaces/entity/cargo.interface';
import { useGetCargos } from '@/api/get-cargos.api';

export const Cargos = () => {
    const [cargos, setCargos] = useState<ICargo[]>([]);

    const [titleFilter, setTitleFilter] = useState<string>('');

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
    
    const { data } = useGetCargos({page, pageSize, titleFilter});

    useEffect(() => {
        if (!data || !data!.headers)
            return;

        if (data.status == 204) {
            setCargos([]);
            return;
        }

        const paginationParamsString = data!.headers[HeaderParams.Pagination] ?? '{}';
        const paginationParams = JSON.parse(paginationParamsString) as IPaginationParams;

        setPage(paginationParams.currentPage);
        setPageSize(paginationParams.pageSize);
        setTotalSize(paginationParams.totalSize);
        setTotalPages(paginationParams.totalPages);

        setCargos(data.data ?? [])
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
                            Weight
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Registration number
                        </th>
                        <th className={clsx(styles.cell, styles.headerCell)}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cargos && cargos.map((cargo, idx) => (
                        <tr key={`cargo-${idx}`}>
                            <td className={styles.cell}>{cargo.title}</td>
                            <td className={styles.cell}>{cargo.weight}</td>
                            <td className={styles.cell}>{cargo.registrationNumber}</td>
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