'use client'

import { SubmitSignIn } from "@/api/submit-signIn.api";
import { ISignInData } from "@/interfaces/signIn.interface";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SignInFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema: yup.ObjectSchema<ISignInData> = yup
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
    const form = useForm<ISignInData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<ISignInData> = async (data) => {
        const result = await SubmitSignIn(data);

        if (
            !result || 
            (result.status >= 400 && 
            result.status <= 599))
            return;

        if (typeof window !== 'undefined')
            localStorage.setItem('user', JSON.stringify(result.data));

        if (onSucces != undefined) onSucces();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <SignInFields/>
            </form>
        </FormProvider>
    );
};