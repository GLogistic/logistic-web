import { ISignUpData } from "@/interfaces/signUp-data.interface";
import { useMutation } from "@tanstack/react-query";
import { logisticHostApiPost } from "./base/post.api";
import { ApiRoute } from "@/enums/api-route.enum";

export const useSubmitSignUp = () => 
    useMutation({
        mutationKey: [],
        mutationFn: async (data: ISignUpData) => await logisticHostApiPost({
            url: `/${ApiRoute.Register}`,
            data,
        }),
    });