import { LogisticHostApi } from "./logisticHost.api";
import { validateApiError } from "./helper/validate-api-error.helper";
import { IApiPatchParams } from "@/interfaces/api/api-patch-params.interface";

export const logisticHostApiPatch = async <TResponse = any>({
    url,
    isValidateResponse = true,
    data,
    config,
}: IApiPatchParams) => await LogisticHostApi.patch<TResponse>(
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