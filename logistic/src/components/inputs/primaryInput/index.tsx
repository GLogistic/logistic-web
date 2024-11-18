import { DOMAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export const PrimaryInput = ({
    inputContainerClassName,
    labelClassName,
    label,
    props,
}: {
    inputContainerClassName?: string | undefined,
    labelClassName?: string | undefined,
    label?: string | undefined,
    props: InputHTMLAttributes<HTMLInputElement>
}) => {
    const transformProps = {...props, className: clsx(styles.primaryInput, props && props.className && props.className)};

    return (
        <div className={clsx(styles.inputContainer, inputContainerClassName)}>
            {label && 
                (<label className={clsx(styles.label, labelClassName)}>
                    {label}
                </label>)}
            <input
            {...transformProps}
            />
        </div>
    )
}