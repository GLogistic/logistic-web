import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiRoute } from "@/enums/api-route.enum";
import { IUser } from "@/interfaces/entity/user.interface";
import { IGetUsersRequest } from "@/interfaces/get-users-request.interface";
import { logisticHostApiGet } from "../base/get.api";
import { IApiHookParams } from "@/interfaces/api/api-hook-params.interface";
import { IApiDeleteEntity } from "@/interfaces/api/api-delete-entity.interface";
import { logisticHostApiPost } from "../base/post.api";

const currentQueryClient = new QueryClient();

const queryKey = 'get-users-key';
export const useGetUsers = (data: IGetUsersRequest) =>
    useQuery({
        queryKey: [queryKey, data.page, data.pageSize],
        queryFn: async () => await logisticHostApiGet<IUser[]>({
            url: `/${ApiRoute.User}?page=${data.page}&pageSize=${data.pageSize}`,
        }),
    })
            
export const useDeleteUser = ({
    onSuccess = undefined,
}: IApiHookParams) => 
    useMutation({
        mutationFn: async (data: IApiDeleteEntity) => await logisticHostApiPost({
            url: `/${ApiRoute.DeleteUser}`,
            data,
        }),
        onSuccess,
    });
        
export const useInvalidateGetUsers = (queryClient?: QueryClient) => () =>
    (queryClient ?? currentQueryClient).invalidateQueries({
        queryKey: [queryKey],
    });  