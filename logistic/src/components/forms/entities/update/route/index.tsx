'use client'

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateRouteFields } from "./fields";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IApiUpdateRoute } from "@/interfaces/api/api-update-route.interface";
import { useUpdateRoute } from "@/api/entities/route.api";

const schema: yup.ObjectSchema<IApiUpdateRoute> = yup
    .object()
    .shape({
        id: yup
            .string()
            .required(),
        startSettlementId: yup
            .string()
            .required('Start settlement is required'),
        endSettlementId: yup
            .string()
            .required('End settlement is required'),
        distance: yup
            .number()
            .required('Distance is required'),
    });

export interface IUpdateRouteFormProps {
    initialState: IApiUpdateRoute;
    onSucces?: () => Promise<void> | void | undefined;
}

export const UpdateRouteForm = ({
    initialState,
    onSucces,
}: IUpdateRouteFormProps) => {
    const form = useForm<IApiUpdateRoute>({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const setRootError = (error: string) => 
        form.setError('root', { message: error });
    
    const updateRouteMutation = useUpdateRoute({});

    const onSubmit: SubmitHandler<IApiUpdateRoute> = async (data) => {
        const result = await updateRouteMutation.mutateAsync(data);

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
                <UpdateRouteFields/>
            </form>
        </FormProvider>
    );
};