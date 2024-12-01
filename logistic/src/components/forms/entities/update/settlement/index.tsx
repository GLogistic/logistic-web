'use client'

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateSettlementFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IApiUpdateSettlement } from "@/interfaces/api/api-update-settlement.interface";
import { useUpdateSettlement } from "@/api/entities/settlement.api";

const schema: yup.ObjectSchema<IApiUpdateSettlement> = yup
    .object()
    .shape({
        id: yup
            .string()
            .required(),
        title: yup
            .string()
            .required('Title is required'),
    });

export interface IUpdateCargoFormProps {
    initialState: IApiUpdateSettlement;
    onSucces?: () => Promise<void> | void | undefined;
}

export const UpdateSettlementForm = ({
    initialState,
    onSucces,
}: IUpdateCargoFormProps) => {
    const form = useForm<IApiUpdateSettlement>({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const updateSettlementMutation = useUpdateSettlement({});

    const onSubmit: SubmitHandler<IApiUpdateSettlement> = async (data) => {
        const result = await updateSettlementMutation.mutateAsync(data);

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
                <UpdateSettlementFields/>
            </form>
        </FormProvider>
    );
};