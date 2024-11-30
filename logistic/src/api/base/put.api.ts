import { LogisticHostApi } from "./logisticHost.api";
import { validateApiError } from "./helper/validate-api-error.helper";
import { IApiPutParams } from "@/interfaces/api/api-put-params.interface";

export const logisticHostApiPut = async <TResponse = any>({
    url,
    isValidateResponse = true,
    data,
    config,
}: IApiPutParams) => await LogisticHostApi.put<TResponse>(
    url,
    data,
    config
)
.then(data => data)
.catch(error => {
    isValidateResponse && validateApiError(error);
    return error;
});