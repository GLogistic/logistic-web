import { IApiSignUpData } from "@/interfaces/api/api-signUp-data.interface";
import { useMutation } from "@tanstack/react-query";
import { logisticHostApiPost } from "../base/post.api";
import { ApiRoute } from "@/enums/api-route.enum";

export const useSubmitSignUp = () => 
    useMutation({
        mutationFn: async (data: IApiSignUpData) => await logisticHostApiPost({
            url: `/${ApiRoute.Register}`,
            data,
        }),
    });