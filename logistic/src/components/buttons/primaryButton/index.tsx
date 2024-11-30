import clsx from 'clsx';
import styles from './styles.module.scss';
import { DOMAttributes, HTMLAttributes } from 'react';

export interface ISubmitButton extends 
            HTMLAttributes<HTMLButtonElement>, 
            DOMAttributes<HTMLButtonElement> {
    disabled?: boolean;
}

export const PrimaryButton = (props: ISubmitButton ) => {
    const transformProps = {...props, className: clsx(styles.primaryButton, props.className)};

    return (
        <button 
        disabled={props.disabled}
        {...transformProps}>
            {props.children}
        </button>
    );
} 