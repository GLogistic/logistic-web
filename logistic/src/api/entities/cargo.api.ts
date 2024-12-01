import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiRoute } from "@/enums/api-route.enum";
import { IApiGetCargos } from "@/interfaces/api/api-get-cargos.interface";
import { ICargo } from "@/interfaces/entity/cargo.interface";
import { logisticHostApiGet } from "../base/get.api";
import { IApiHookParams } from "@/interfaces/api/api-hook-params.interface";
import { IApiDeleteEntity } from "@/interfaces/api/api-delete-entity.interface";
import { logisticHostApiPost } from "../base/post.api";
import { IApiUpdateCargo } from "@/interfaces/api/api-update-cargo.interface";
import { logisticHostApiPut } from "../base/put.api";
import { IApiCreateCargo } from "@/interfaces/api/api-create-cargo.interface";

const currentQueryClient = new QueryClient();

const queryKey = 'get-cargos-key';
export const useGetCargos = (data: IApiGetCargos) =>
    useQuery({
        queryKey: [queryKey, data.titleFilter, data.page, data.pageSize],
        queryFn: async () => await logisticHostApiGet<ICargo[]>({
            url: `/${ApiRoute.Cargo}?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`
        }),
    })

export const useDeleteCargo = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiDeleteEntity) => await logisticHostApiPost({
            url: `/${ApiRoute.DeleteCargo}`,
            data,
        }),
        onSuccess,
    });

export const useUpdateCargo = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiUpdateCargo) => await logisticHostApiPut({
            url: `/${ApiRoute.UpdateCargo}`,
            data,
        }),
        onSuccess,
    });

export const useCreateCargo = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiCreateCargo) => await logisticHostApiPost({
            url: `/${ApiRoute.Cargo}`,
            data,
        }),
        onSuccess,
    });
    
export const useInvalidateGetCargos = (queryClient?: QueryClient) => () =>
    (queryClient ?? currentQueryClient).invalidateQueries({
        queryKey: [queryKey],
    });