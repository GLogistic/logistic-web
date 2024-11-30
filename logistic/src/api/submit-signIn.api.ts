import { ISignInData } from "@/interfaces/signIn.interface";
import { useMutation } from "@tanstack/react-query";
import { logisticHostApiPost } from "./base/post.api";
import { ApiRoute } from "@/enums/api-route.enum";

export const useSubmitSignIn = () => 
    useMutation({
        mutationKey: [],
        mutationFn: async (data: ISignInData) => await logisticHostApiPost({
            url: `/${ApiRoute.Login}`,
            isValidateResponse: false,
            data,
        }),
    });