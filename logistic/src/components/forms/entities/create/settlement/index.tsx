'use client'

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CreateSettlementFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSettlement } from "@/api/entities/settlement.api";
import { IApiCreateSettlement } from "@/interfaces/api/api-create-settlement.interface";

const schema: yup.ObjectSchema<IApiCreateSettlement> = yup
    .object()
    .shape({
        title: yup
            .string()
            .required('Title is required'),
    });

export interface IUpdateCargoFormProps {
    onSucces?: () => Promise<void> | void | undefined;
}

export const CreateSettlementForm = ({
    onSucces,
}: IUpdateCargoFormProps) => {
    const form = useForm<IApiCreateSettlement>({
        resolver: yupResolver(schema),
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const createSettlementMutation = useCreateSettlement({});

    const onSubmit: SubmitHandler<IApiCreateSettlement> = async (data) => {
        const result = await createSettlementMutation.mutateAsync(data);

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
                <CreateSettlementFields/>
            </form>
        </FormProvider>
    );
};