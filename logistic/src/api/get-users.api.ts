import { LogisticHostApi } from "./base/logisticHost.api";
import { IGetSettlementsRequest } from "@/interfaces/get-settlements-request.interface";
import { useQuery } from "@tanstack/react-query";
import { ApiRoute } from "@/enums/api-route.enum";
import { IUser } from "@/interfaces/entity/user.interface";
import { IGetUsersRequest } from "@/interfaces/get-users-request.interface";
import { logisticHostApiGet } from "./base/get.api";

const queryKey = 'get-users-key';
export const useGetUsers = (data: IGetUsersRequest) =>
    useQuery({
        queryKey: [data.page, data.pageSize, queryKey],
        queryFn: async () => await logisticHostApiGet<IUser[]>({
            url: `/${ApiRoute.User}?page=${data.page}&pageSize=${data.pageSize}`,
        }),
    })
    