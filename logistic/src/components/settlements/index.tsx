'use client'

import { GetSettlements } from '@/api/get-settlements.api';
import { ISettlement } from '@/interfaces/settlement.interface';
import { useState, useEffect, ChangeEvent } from 'react';
import { usePagination } from '../helpers/use-pagination.helper';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { PrimaryButton } from '../buttons/defaultButton';
import Link from 'next/link';
import { PrimaryInput } from '../inputs/primaryInput';

export const Settlements = () => {
    const [settlements, setSettlements] = useState<ISettlement[]>([]);

    const [titleFilter, setTitleFilter] = useState<string>('');

    const searchParams = useSearchParams();
    
    const { 
        page, 
        pageSize,
        setPage,
        setPageSize, 
    } = usePagination(
        Number(searchParams.get('page')),
        Number(searchParams.get('pageSize'))
    );
    
    useEffect(() => {
        const fetchSettlements = async () => {
            const result = await GetSettlements({page, pageSize, titleFilter});

            setSettlements(result?.data as ISettlement[] ?? [])
        };

        fetchSettlements();
    }, [page, pageSize, titleFilter]);

    return (
        <>
            <table className={styles.entityTable}>
                <thead>
                    <tr>
                        <th>
                            <div className={clsx(styles.cell, styles.headerCellWithFilter)}>
                                <p>
                                    Title
                                </p>
                                <div className={styles.titleFilter}>
                                    <PrimaryInput
                                    inputContainerClassName={styles.titleInputContainer}
                                    props={{
                                        placeholder: 'Enter title...',
                                        onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                            setTitleFilter(e.target.value);
                                        },
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
        </>
    );
};