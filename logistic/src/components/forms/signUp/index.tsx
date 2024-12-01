import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SignUpFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IApiSignUpData } from "@/interfaces/api/api-signUp-data.interface";
import { useSubmitSignUp } from "@/api/auth/submit-signUp.api";

const schema: yup.ObjectSchema<IApiSignUpData> = yup
    .object()
    .shape({
        FirstName: yup
            .string()
            .required('First name is required')
            .min(2, 'Length must be rather than 2'),
        LastName: yup
            .string()
            .required('Last name is required')
            .min(2, 'Length must be rather than 2'),
        UserName: yup
            .string()
            .required('User name is required')
            .min(2, 'Length must be rather than 2'),
        Email: yup
            .string()
            .email('Must be a email')
            .required('Email is required'),
        Password: yup
            .string()
            .strict()
            .matches(/[0-9]/, 'Must presence a digits')
            .matches(/[a-z]/, 'Must presence a lowercase letters')
            .matches(/[A-Z]/, 'Must presence a uppercase letters')
            .min(10, 'Must be rather then 10 characters')
            .required('Password is required')
    });

export interface ISignUpFormProps {
    onSucces?: () => void | undefined;
}

export const SignUpForm = ({
    onSucces,
}: ISignUpFormProps) => {
    const form = useForm<IApiSignUpData>({
        resolver: yupResolver(schema),
    });

    const signUpMutation = useSubmitSignUp();

    const onSubmit: SubmitHandler<IApiSignUpData> = async (data) => {
        const result = await signUpMutation.mutateAsync(data);

        if (
            !result || 
            (result.status >= 400 && 
            result.status <= 599))
            return;

        if (onSucces != undefined) onSucces();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <SignUpFields/>
            </form>
        </FormProvider>
    );
};