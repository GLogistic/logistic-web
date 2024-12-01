import clsx from 'clsx';
import { MouseEvent, useEffect, useRef } from 'react';
import { useResizeWindow } from '@/helpers/useResizeWindow';

import styles from './styles.module.scss';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { IDeleteEntityModalParams } from '@/interfaces/params/delete-entity-modal-params.interface';

export const DeleteEntityModal = ({
    isOpen,
    entityTitle,
    onClose,
    onDelete,
    error = '',
    wrapperStyles = '',
    containerStyles = '',
}: IDeleteEntityModalParams) => {
    if (!isOpen)
        return;
    
    const { isMobile } = useResizeWindow();

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickOverWrapper = (e: MouseEvent<HTMLDivElement>) => {
            if (wrapperRef && 
                wrapperRef.current && 
                !wrapperRef.current.contains(e.target as Node))
                onClose();
        };

        document.addEventListener('click', clickOverWrapper as any);

        return () => {
            document.removeEventListener('click', clickOverWrapper as any);
        }
    }, [onClose]);

    return (
        <div className={styles.overlay}>
            <div 
            className={clsx(styles.modalWrapper, wrapperStyles)}
            ref={wrapperRef}>
                <div className={clsx(styles.modalContainer, containerStyles)}>
                    <div
                    className={styles.modalContainerHeader}>
                        <button 
                        className={styles.closeIconButton}
                        onClick={onClose}>
                            <CloseIcon
                                width={isMobile ? 20 : 25}
                                height={isMobile ? 20 : 25}
                            />
                        </button>
                    </div>
                    <div className={styles.modalContent}>
                        <p className={styles.approveText}>
                            Are you sure delete
                            <span className={styles.entityTitle}> {entityTitle}</span>?
                        </p>
                        <div className={styles.buttonsContainer}>
                            <button 
                            className={clsx(styles.button, styles.approve)}
                            onClick={onDelete}
                            >
                                Confirm
                            </button>
                            <button 
                            className={clsx(styles.button, styles.reject)}
                            onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className={styles.errorContainer}>
                            <p className={styles.error}>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};