import { ApiRoute } from "@/enums/api-route.enum";
import { LogisticHostApi } from "./base/logisticHost.api";
import { useMutation } from "@tanstack/react-query";
import { logisticHostApiPost } from "./base/post.api";

export const useSubmitLogout = () => 
    useMutation({
        mutationKey: [],
        mutationFn: async () => await logisticHostApiPost({
            url: `/${ApiRoute.Logout}`,
        }),
    });