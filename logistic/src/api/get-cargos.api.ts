import { LogisticHostApi } from "./base/logisticHost.api";
import { useQuery } from "@tanstack/react-query";
import { Route } from "@/enums/route.enum";
import { IGetCargosRequest } from "@/interfaces/get-cargos-request.interface";
import { ICargo } from "@/interfaces/entity/cargo.interface";


const queryKey = 'get-cargos-key';
export const useGetCargos = (data: IGetCargosRequest) =>
    useQuery({
        queryKey: [data.titleFilter, data.page, data.pageSize, queryKey],
        queryFn: async () => await LogisticHostApi.get<ICargo[]>(
            `/${Route.Cargo}?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`,
        ),
    })
    