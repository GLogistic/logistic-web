import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiRoute } from "@/enums/api-route.enum";
import { IRoute } from "@/interfaces/entity/route.interface";
import { IApiGetRoutes } from "@/interfaces/api/api-get-routes.interface";
import { logisticHostApiGet } from "../base/get.api";
import { IApiDeleteEntity } from "@/interfaces/api/api-delete-entity.interface";
import { IApiHookParams } from "@/interfaces/api/api-hook-params.interface";
import { logisticHostApiPost } from "../base/post.api";
import { IApiUpdateRoute } from "@/interfaces/api/api-update-route.interface";
import { logisticHostApiPut } from "../base/put.api";
import { IApiCreateRoute } from "@/interfaces/api/api-create-route.interface";

const currentQueryClient = new QueryClient();

const queryKey = 'get-routes-key';
export const useGetRoutes = (data: IApiGetRoutes) =>
    useQuery({
        queryKey: [queryKey, data.startSettlementTitleFilter, data.page, data.pageSize],
        queryFn: async () => await logisticHostApiGet<IRoute[]>({
            url: `/${ApiRoute.Route}?page=${data.page}&pageSize=${data.pageSize}${(data.startSettlementTitleFilter && data.startSettlementTitleFilter != '') ? `&startSettlementTitleFilter=${data.startSettlementTitleFilter}` : ''}`,
        }),
    })

export const useDeleteRoute = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiDeleteEntity) => await logisticHostApiPost({
            url: `/${ApiRoute.DeleteRoute}`,
            data,
        }),
        onSuccess,
    });
    
export const useUpdateRoute = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiUpdateRoute) => await logisticHostApiPut({
            url: `/${ApiRoute.UpdateRoute}`,
            data,
        }),
        onSuccess,
    });

export const useCreateRoute = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiCreateRoute) => await logisticHostApiPost({
            url: `/${ApiRoute.Route}`,
            data,
        }),
        onSuccess,
    });

export const useInvalidateGetRoutes = (queryClient?: QueryClient) => () =>
    (queryClient ?? currentQueryClient).invalidateQueries({
        queryKey: [queryKey],
    });