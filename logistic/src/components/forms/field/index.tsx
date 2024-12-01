import { IFormFieldProps } from "@/interfaces/form-field-props.interface";
import clsx from 'clsx';

import styles from './styles.module.scss';

export const FormField = ({
    type,
    placeholder,
    register,
    onChange,
    error,
    label = '',
    errorClassName = '',
    inputLabelClassName = '',
    inputClassName = '',
    inputContainerClassName = '',
}: IFormFieldProps) => (
    <div className={clsx(styles.inputContainer, inputContainerClassName)}>
        <label className={clsx(styles.inputLabel, inputLabelClassName)}>{label}</label>
        <input
        type={type}
        placeholder={placeholder}
        {...register()}
        onChange={onChange}
        className={clsx(styles.input, inputClassName)}
        />
        <span className={clsx(styles.error, errorClassName)}>{error && error.message}</span>
    </div>
);