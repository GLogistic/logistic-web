import { IApiSignInData } from "@/interfaces/api/api-signIn-data.interface";
import { useMutation } from "@tanstack/react-query";
import { logisticHostApiPost } from "../base/post.api";
import { ApiRoute } from "@/enums/api-route.enum";

export const useSubmitSignIn = () => 
    useMutation({
        mutationFn: async (data: IApiSignInData) => await logisticHostApiPost({
            url: `/${ApiRoute.Login}`,
            isValidateResponse: false,
            data,
        }),
    });