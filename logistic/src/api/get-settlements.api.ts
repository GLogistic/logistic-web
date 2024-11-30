import { LogisticHostApi } from "./base/logisticHost.api";
import { IGetSettlementsRequest } from "@/interfaces/get-settlements-request.interface";
import { useQuery } from "@tanstack/react-query";
import { ISettlement } from "@/interfaces/entity/settlement.interface";
import { Route } from "@/enums/route.enum";

const queryKey = 'get-settlements-key';
export const useGetSettlements = (data: IGetSettlementsRequest) =>
    useQuery({
        queryKey: [data.titleFilter, data.page, data.pageSize, queryKey],
        queryFn: async () => await LogisticHostApi.get<ISettlement[]>(
            `/${Route.Settlement}?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`,
        ),
    })
    