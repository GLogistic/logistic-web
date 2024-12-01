import { ApiRoute } from "@/enums/api-route.enum";
import { useMutation } from "@tanstack/react-query";
import { logisticHostApiPost } from "../base/post.api";

export const useSubmitLogout = () => 
    useMutation({
        mutationFn: async () => await logisticHostApiPost({
            url: `/${ApiRoute.Logout}`,
        }),
    });