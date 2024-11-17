import { ISignInData } from "@/interfaces/signIn.interface";
import { LogisticHostApi } from "./base/logisticHost.api";
import { IApiResponseInterface } from "@/interfaces/api-response.interface";

export const SubmitSignIn = async (data: ISignInData): Promise<IApiResponseInterface | null> => {
    let result: IApiResponseInterface | null = null;

    await LogisticHostApi.post(
        '/login',
        data,
    ).then(res => result = res).catch((e) => {
        console.log(e);
    });

    return result;
};