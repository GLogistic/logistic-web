import { ISignInData } from "@/interfaces/signIn.interface";
import { LogisticHostApi } from "./base/logisticHost.api";
import { useMutation } from "@tanstack/react-query";

export const useSubmitSignIn = (data: ISignInData) =>  {
    return useMutation({
        mutationKey: [],
        mutationFn: async () => await LogisticHostApi.post(
            '/login',
            data,
        )
    });
}
