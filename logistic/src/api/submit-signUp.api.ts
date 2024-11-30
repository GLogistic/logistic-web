import { LogisticHostApi } from "./base/logisticHost.api";
import { ISignUpData } from "@/interfaces/signUp-data.interface";
import { useMutation } from "@tanstack/react-query";

export const useSubmitSignUp = (data: ISignUpData) => {
    return useMutation({
        mutationKey: [],
         mutationFn: async () => await LogisticHostApi.post(
            '/register',
            data,
        ), 
    });
}