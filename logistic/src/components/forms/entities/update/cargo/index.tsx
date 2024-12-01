'use client'

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateCargoFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IApiUpdateCargo } from "@/interfaces/api/api-update-cargo.interface";
import { useUpdateCargo } from "@/api/entities/cargo.api";

const schema: yup.ObjectSchema<IApiUpdateCargo> = yup
    .object()
    .shape({
        id: yup
            .string()
            .required(),
        title: yup
            .string()
            .required('Title is required'),
        weight: yup
            .number()
            .required('Weight is required')
            .min(0, 'Min weight - 0'),
        registrationNumber: yup
            .string()
            .required('Registration number is required'),
    });

export interface IUpdateCargoFormProps {
    initialState: IApiUpdateCargo;
    onSucces?: () => Promise<void> | void | undefined;
}

export const UpdateCargoForm = ({
    initialState,
    onSucces,
}: IUpdateCargoFormProps) => {
    const form = useForm<IApiUpdateCargo>({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const updateCargoMutation = useUpdateCargo({});

    const onSubmit: SubmitHandler<IApiUpdateCargo> = async (data) => {
        const result = await updateCargoMutation.mutateAsync(data);

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
                <UpdateCargoFields/>
            </form>
        </FormProvider>
    );
};