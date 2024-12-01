import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiRoute } from "@/enums/api-route.enum";
import { IRoute } from "@/interfaces/entity/route.interface";
import { IGetRoutesRequest } from "@/interfaces/get-routes-request.interface";
import { logisticHostApiGet } from "../base/get.api";
import { IApiDeleteEntity } from "@/interfaces/api/api-delete-entity.interface";
import { IApiHookParams } from "@/interfaces/api/api-hook-params.interface";
import { logisticHostApiPost } from "../base/post.api";

const currentQueryClient = new QueryClient();

const queryKey = 'get-routes-key';
export const useGetRoutes = (data: IGetRoutesRequest) =>
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
    
export const useInvalidateGetRoutes = (queryClient?: QueryClient) => () =>
    (queryClient ?? currentQueryClient).invalidateQueries({
        queryKey: [queryKey],
    });