import { IApiResponseInterface } from "@/interfaces/api-response.interface";
import { LogisticHostApi } from "./base/logisticHost.api";

export const SubmitLogout = async (): Promise<IApiResponseInterface | null> => {
    let result: IApiResponseInterface | null = null;

    await LogisticHostApi.post(
        '/logout',
    ).then(res => result = res).catch((e) => {
        console.log(e);
    });

    return result;
};