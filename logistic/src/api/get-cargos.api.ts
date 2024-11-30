import { useQuery } from "@tanstack/react-query";
import { ApiRoute } from "@/enums/api-route.enum";
import { IGetCargosRequest } from "@/interfaces/get-cargos-request.interface";
import { ICargo } from "@/interfaces/entity/cargo.interface";
import { logisticHostApiGet } from "./base/get.api";


const queryKey = 'get-cargos-key';
export const useGetCargos = (data: IGetCargosRequest) =>
    useQuery({
        queryKey: [data.titleFilter, data.page, data.pageSize, queryKey],
        queryFn: async () => await logisticHostApiGet<ICargo[]>({
            url: `/${ApiRoute.Cargo}?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`
        }),
    })
    