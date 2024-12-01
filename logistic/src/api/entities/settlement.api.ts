import { IGetSettlementsRequest } from "@/interfaces/get-settlements-request.interface";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ISettlement } from "@/interfaces/entity/settlement.interface";
import { ApiRoute } from "@/enums/api-route.enum";
import { logisticHostApiGet } from "../base/get.api";
import { IApiHookParams } from "@/interfaces/api/api-hook-params.interface";
import { IApiDeleteEntity } from "@/interfaces/api/api-delete-entity.interface";
import { logisticHostApiPost } from "../base/post.api";

const currentQueryClient = new QueryClient();

const queryKey = 'get-settlements-key';
export const useGetSettlements = (data: IGetSettlementsRequest) =>
    useQuery({
        queryKey: [queryKey, data.titleFilter, data.page, data.pageSize],
        queryFn: async () => await logisticHostApiGet<ISettlement[]>({
            url: `/${ApiRoute.Settlement}?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`,
        }),
    })
    
export const useDeleteSettlement = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiDeleteEntity) => await logisticHostApiPost({
            url: `/${ApiRoute.DeleteSettlement}`,
            data,
        }),
        onSuccess,
    });
      
export const useInvalidateGetSettlements = (queryClient?: QueryClient) => () =>
    (queryClient ?? currentQueryClient).invalidateQueries({
        queryKey: [queryKey],
    });  