import { LogisticHostApi } from "./base/logisticHost.api";
import { IGetSettlementsRequest } from "@/interfaces/get-settlements-request.interface";
import { useQuery } from "@tanstack/react-query";
import { Route } from "@/enums/route.enum";
import { IUser } from "@/interfaces/entity/user.interface";
import { IGetUsersRequest } from "@/interfaces/get-users-request.interface";

const queryKey = 'get-users-key';
export const useGetUsers = (data: IGetUsersRequest) =>
    useQuery({
        queryKey: [data.page, data.pageSize, queryKey],
        queryFn: async () => await LogisticHostApi.get<IUser[]>(
            `/${Route.User}?page=${data.page}&pageSize=${data.pageSize}`,
        ),
    })
    