import { LogisticHostApi } from "./base/logisticHost.api";
import { useQuery } from "@tanstack/react-query";
import { Route } from "@/enums/route.enum";
import { IRoute } from "@/interfaces/entity/route.interface";
import { IGetRoutesRequest } from "@/interfaces/get-routes-request.interface";

const queryKey = 'get-routes-key';
export const useGetRoutes = (data: IGetRoutesRequest) =>
    useQuery({
        queryKey: [data.startSettlementTitleFilter, data.page, data.pageSize, queryKey],
        queryFn: async () => await LogisticHostApi.get<IRoute[]>(
            `/${Route.Route}?page=${data.page}&pageSize=${data.pageSize}${(data.startSettlementTitleFilter && data.startSettlementTitleFilter != '') ? `&startSettlementTitleFilter=${data.startSettlementTitleFilter}` : ''}`,
        ),
    })
    