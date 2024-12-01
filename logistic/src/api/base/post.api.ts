import { LogisticHostApi } from "./logisticHost.api";
import { validateApiError } from "./helper/validate-api-error.helper";
import { IApiPostParams } from "@/interfaces/api/api-post-params.interface";

export const logisticHostApiPost = async <TResponse = any>({
    url,
    isValidateResponse = true,
    data,
    config,
}: IApiPostParams) => await LogisticHostApi.post<TResponse>(
    url,
    data,
    config
)
.then(data => data)
.catch(error => {
    if(isValidateResponse)
        validateApiError(error);
    return error;
});