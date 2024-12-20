import clsx from 'clsx';
import styles from './styles.module.scss';
import { DOMAttributes, HTMLAttributes } from 'react';

export interface ISubmitButton extends 
            HTMLAttributes<HTMLButtonElement>, 
            DOMAttributes<HTMLButtonElement> {
    disabled?: boolean;
}

export const SubmitButton = (props: ISubmitButton) => {
    const transformProps = {...props, className: clsx(styles.submitButton, props.className)};

    return (
        <button 
        type="submit"
        {...transformProps}
        >
            {props.children}
        </button>
    );
};