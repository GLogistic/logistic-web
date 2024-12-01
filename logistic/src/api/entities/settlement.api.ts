import { IApiGetSettlements } from "@/interfaces/api/api-get-settlements.interface";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ISettlement } from "@/interfaces/entity/settlement.interface";
import { ApiRoute } from "@/enums/api-route.enum";
import { logisticHostApiGet } from "../base/get.api";
import { IApiHookParams } from "@/interfaces/api/api-hook-params.interface";
import { IApiDeleteEntity } from "@/interfaces/api/api-delete-entity.interface";
import { logisticHostApiPost } from "../base/post.api";
import { IApiUpdateSettlement } from "@/interfaces/api/api-update-settlement.interface";
import { logisticHostApiPut } from "../base/put.api";
import { IApiCreateSettlement } from "@/interfaces/api/api-create-settlement.interface";

const currentQueryClient = new QueryClient();

const queryKey = 'get-settlements-key';
export const useGetSettlements = (data: IApiGetSettlements) =>
    useQuery({
        queryKey: [queryKey, data.titleFilter, data.page, data.pageSize],
        queryFn: async () => await logisticHostApiGet<ISettlement[]>({
            url: `/${ApiRoute.Settlement}?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`,
        }),
    })

const getAllQueryKey = 'get-all-settlements-key';
export const useGetAllSettlements = () =>
    useQuery({
        queryKey: [getAllQueryKey],
        queryFn: async () => await logisticHostApiGet<ISettlement[]>({
            url: `/${ApiRoute.AllSettlement}`,
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

export const useUpdateSettlement = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiUpdateSettlement) => await logisticHostApiPut({
            url: `/${ApiRoute.UpdateSettlement}`,
            data,
        }),
        onSuccess,
    });

export const useCreateSettlement = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiCreateSettlement) => await logisticHostApiPost({
            url: `/${ApiRoute.Settlement}`,
            data,
        }),
        onSuccess,
    });
      
export const useInvalidateGetSettlements = (queryClient?: QueryClient) => () =>
    (queryClient ?? currentQueryClient).invalidateQueries({
        queryKey: [queryKey],
    });  