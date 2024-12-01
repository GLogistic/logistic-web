'use client'

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CreateRouteFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateRoute } from "@/api/entities/route.api";
import { IApiCreateRoute } from "@/interfaces/api/api-create-route.interface";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const schema: yup.ObjectSchema<IApiCreateRoute> = yup
    .object()
    .shape({
        startSettlementId: yup
            .string()
            .required('Start settlement is required')
            .matches(uuidRegex, 'Client error (write to support)'),
        endSettlementId: yup
            .string()
            .required('End settlement is required')
            .matches(uuidRegex, 'Client error (write to support)'),
        distance: yup
            .number()
            .required('Distance is required'),
    });

export interface IUpdateRouteFormProps {
    onSucces?: () => Promise<void> | void | undefined;
}

export const CreateRouteForm = ({
    onSucces,
}: IUpdateRouteFormProps) => {
    const form = useForm<IApiCreateRoute>({
        resolver: yupResolver(schema),
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const createRouteMutation = useCreateRoute({});

    const onSubmit: SubmitHandler<IApiCreateRoute> = async (data) => {
        const result = await createRouteMutation.mutateAsync(data);

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
                <CreateRouteFields/>
            </form>
        </FormProvider>
    );
};