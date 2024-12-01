'use client'

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CreateCargoFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCargo } from "@/api/entities/cargo.api";
import { IApiCreateCargo } from "@/interfaces/api/api-create-cargo.interface";

const schema: yup.ObjectSchema<IApiCreateCargo> = yup
    .object()
    .shape({
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
    onSucces?: () => Promise<void> | void | undefined;
}

export const CreateCargoForm = ({
    onSucces,
}: IUpdateCargoFormProps) => {
    const form = useForm<IApiCreateCargo>({
        resolver: yupResolver(schema),
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const createCargoMutation = useCreateCargo({});

    const onSubmit: SubmitHandler<IApiCreateCargo> = async (data) => {
        const result = await createCargoMutation.mutateAsync(data);

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
                <CreateCargoFields/>
            </form>
        </FormProvider>
    );
};