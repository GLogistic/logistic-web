import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiRoute } from "@/enums/api-route.enum";
import { IGetCargosRequest } from "@/interfaces/get-cargos-request.interface";
import { ICargo } from "@/interfaces/entity/cargo.interface";
import { logisticHostApiGet } from "../base/get.api";
import { IApiHookParams } from "@/interfaces/api/api-hook-params.interface";
import { IApiDeleteEntity } from "@/interfaces/api/api-delete-entity.interface";
import { logisticHostApiPost } from "../base/post.api";

const currentQueryClient = new QueryClient();

const queryKey = 'get-cargos-key';
export const useGetCargos = (data: IGetCargosRequest) =>
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
    
export const useInvalidateGetCargos = (queryClient?: QueryClient) => () =>
    (queryClient ?? currentQueryClient).invalidateQueries({
        queryKey: [queryKey],
    });