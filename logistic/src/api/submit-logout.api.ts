import { LogisticHostApi } from "./base/logisticHost.api";
import { useMutation } from "@tanstack/react-query";

export const useSubmitLogout = () => 
    useMutation({
        mutationKey: [],
        mutationFn: async () => await LogisticHostApi.post(
            '/logout',
        ),
    });