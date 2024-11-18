import { IApiResponseInterface } from "@/interfaces/api-response.interface";
import { LogisticHostApi } from "./base/logisticHost.api";
import { IGetSettlementsRequest } from "@/interfaces/get-settlements-request.interface";

export const GetSettlements = async (data: IGetSettlementsRequest): Promise<IApiResponseInterface | null> => {
    let result: IApiResponseInterface | null = null;

    await LogisticHostApi.get(
        `/settlements?page=${data.page}&pageSize=${data.pageSize}${(data.titleFilter && data.titleFilter != '') ? `&titleFilter=${data.titleFilter}` : ''}`,
    ).then(res => result = res).catch((e) => {
        console.log(e);
    });

    return result;
};