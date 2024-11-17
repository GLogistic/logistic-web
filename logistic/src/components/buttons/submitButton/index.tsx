import clsx from 'clsx';
import styles from './styles.module.scss';

export interface ISubmitButton {
    className: string;
    text: string;
    disabled?: boolean;
}

export const SubmitButton = ({
    disabled,
    className,
    text,
}: ISubmitButton) => (
    <button 
    type="submit"
    disabled={disabled}
    className={clsx(styles.submitButton, className)}>
        {text}
    </button>
);