'use client'

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IApiUpdateUser } from "@/interfaces/api/api-update-user.interface";
import { useUpdateUser } from "@/api/entities/user.api";

const schema: yup.ObjectSchema<IApiUpdateUser> = yup
    .object()
    .shape({
        id: yup
            .string()
            .required(),
        securityStamp: yup
            .string()
            .required(),
        firstName: yup
            .string()
            .required('First name is required'),
        lastName: yup
            .string()
            .required('Last name is required'),
        userName: yup
            .string()
            .required('User name is required'),
        email: yup
            .string()
            .required('Email is required')
            .email('Must be a email'),
    });

export interface IUpdateCargoFormProps {
    initialState: IApiUpdateUser;
    onSucces?: () => Promise<void> | void | undefined;
}

export const UpdateUserForm = ({
    initialState,
    onSucces,
}: IUpdateCargoFormProps) => {
    const form = useForm<IApiUpdateUser>({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const updateUserMutation = useUpdateUser({});

    const onSubmit: SubmitHandler<IApiUpdateUser> = async (data) => {
        const result = await updateUserMutation.mutateAsync(data);

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

        if (result.data == undefined || result.data == null) {
            setRootError('Something went wrong');
            return;
        }

        if (onSucces != undefined) 
            await onSucces();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <UpdateUserFields/>
            </form>
        </FormProvider>
    );
};