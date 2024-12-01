import clsx from 'clsx';
import { MouseEvent, useEffect, useRef } from 'react';
import { useResizeWindow } from '@/helpers/useResizeWindow';

import styles from './styles.module.scss';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { IModalWithOverlayParams } from '@/interfaces/params/modal-with-overlay-params.inteface';

export const ModalWithOverlay = ({
    isOpen,
    children,
    onClose,
    wrapperStyles = '',
    containerStyles = '',
}: IModalWithOverlayParams) => {
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
                    {children}
                </div>
            </div>
        </div>
    )
};