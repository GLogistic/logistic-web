import { ChangeEvent } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface IFormFieldProps {
    type: string;
    placeholder: string;
    register: () => UseFormRegisterReturn;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
    error: FieldError | undefined;
    label?: string | undefined;
    errorClassName?: string | undefined;
    inputLabelClassName?: string | undefined;
    inputClassName?: string | undefined;
    inputContainerClassName?: string | undefined;
}