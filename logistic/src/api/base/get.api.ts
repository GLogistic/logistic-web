import { IApiGetParams } from "@/interfaces/api/api-get-params.interface";
import { LogisticHostApi } from "./logisticHost.api";
import { validateApiError } from "./helper/validate-api-error.helper";

export const logisticHostApiGet = async <TResponse = any>({
    url,
    isValidateResponse = true,
    config,
}: IApiGetParams) => await LogisticHostApi.get<TResponse>(
    url,
    config
)
.then(data => data)
.catch(error => {
    if(isValidateResponse)
        validateApiError(error);
    return error;
});