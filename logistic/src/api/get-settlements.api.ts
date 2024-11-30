import { LogisticHostApi } from "./base/logisticHost.api";
import { IGetSettlementsRequest } from "@/interfaces/get-settlements-request.interface";
import { useQuery } from "@tanstack/react-query";
import { ISettlement } from "@/interfaces/entity/settlement.interface";
import { ApiRoute } from "@/enums/api-route.enum";
import { logisticHostApiGet } from "./base/get.api";

const queryKey = 'get-settlements-key';
export const useGetSettlements = (data: IGetSettlementsRequest) =>
    useQuery({
        queryKey: [data.titleFilter, data.page, data.pageSize, queryKey],
        queryFn: async () => await logisticHostApiGet<ISettlement[]>({
            url: `/${ApiRoute.Settlement}?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`,
        }),
    })
    