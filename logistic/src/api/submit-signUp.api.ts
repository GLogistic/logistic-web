import { LogisticHostApi } from "./base/logisticHost.api";
import { IApiResponseInterface } from "@/interfaces/api-response.interface";
import { ISignUpData } from "@/interfaces/signUp-data.interface";

export const SubmitSignUp = async (data: ISignUpData): Promise<IApiResponseInterface | null> => {
    let result: IApiResponseInterface | null = null;

    await LogisticHostApi.post(
        '/register',
        data,
    ).then(res => result = res).catch((e) => {
        console.log(e);
    });

    return result;
};