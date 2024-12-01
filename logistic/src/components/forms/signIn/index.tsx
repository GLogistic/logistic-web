'use client'

import { useSubmitSignIn } from "@/api/auth/submit-signIn.api";
import { IApiSignInData } from "@/interfaces/api/api-signIn-data.interface";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SignInFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema: yup.ObjectSchema<IApiSignInData> = yup
    .object()
    .shape({
        Email: yup
            .string()
            .email('Must be a email')
            .required('Email is required'),
        Password: yup
            .string()
            .required('Password is required')
    });

export interface ISignInFormProps {
    onSucces?: () => void | undefined;
}

export const SignInForm = ({
    onSucces,
}: ISignInFormProps) => {
    const form = useForm<IApiSignInData>({
        resolver: yupResolver(schema),
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const signInMutation = useSubmitSignIn();

    const onSubmit: SubmitHandler<IApiSignInData> = async (data) => {
        const result = await signInMutation.mutateAsync(data);

        if (!result) {
            setRootError('Something went wrong');
            return;
        }

        if (result.status >= 400 && result.status <= 499) {
            setRootError('Ivalid credentials');
            return;
        }

        if (result.status >= 500 && result.status <= 599) {
            setRootError('Server error');
            return;
        }

        if (!result.data) {
            setRootError('Something went wrong');
            return;
        }

        if (typeof window !== 'undefined')
            localStorage.setItem('user', JSON.stringify(result.data));

        if (onSucces != undefined) 
            onSucces();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <SignInFields/>
            </form>
        </FormProvider>
    );
};