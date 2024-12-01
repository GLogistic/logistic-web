import clsx from 'clsx';

import styles from './styles.module.scss';
import { IFormFieldWithDropdownListProps } from "@/interfaces/form-field-with-dropdown-list-props.interface";
import { MouseEvent, useEffect, useRef, useState } from 'react';

export const FormFieldWithEntityDropdownList = ({
    items,
    selectedItemTitle,
    onChange,
    error,
    label = '',
    errorClassName = '',
    fieldContainerClassName = '',
    fieldClassName = '',
    fieldLabelClassName = '',
}: IFormFieldWithDropdownListProps) => {
    const [isShowList, setIsShowList] = useState<boolean>(false);

    const dropdownListRef = useRef<HTMLDivElement | null>(null);
    const dropdownListTriggerRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const clickOverDropdownList = (e: MouseEvent<HTMLDivElement>) => {
            if (
                dropdownListRef && 
                dropdownListTriggerRef && 
                dropdownListRef.current && 
                dropdownListTriggerRef.current && 
                !dropdownListRef.current.contains(e.target as Node) &&
                !dropdownListTriggerRef.current.contains(e.target as Node)
            ) setIsShowList(false)
        };

        document.addEventListener('click', clickOverDropdownList as any);

        return () => {
            document.removeEventListener('click', clickOverDropdownList as any);
        }
    }, []);

    return (
    <div className={clsx(styles.fieldContainer, fieldContainerClassName)}>
        <label className={clsx(styles.fieldLabel, fieldLabelClassName)}>{label}</label>
        <div
        className={clsx(styles.field, fieldClassName)}
        >
            <p 
            className={styles.selectedItemTitle}
            onClick={() => setIsShowList(!isShowList)}
            ref={dropdownListTriggerRef}
            >
                {selectedItemTitle && selectedItemTitle != '' 
                ? selectedItemTitle
                : 'Select item'}
            </p>

            <div 
            className={clsx(styles.dropdownList, isShowList && styles.show)}
            ref={dropdownListRef}
            >
            {items.map(item => (
                <div 
                key={`item-${item.id}`}
                className={styles.item}
                onClick={() => {
                    onChange(item);
                    setIsShowList(false);
                }}
                >
                    <p className={styles.itemTitle}>
                        {item.title}
                    </p>
                </div>
            ))}
            </div>
        </div>
        <span className={clsx(styles.error, errorClassName)}>{error && error.message}</span>
    </div>
    )
};