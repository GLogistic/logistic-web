import { AxiosRequestConfig } from "axios";

export interface IApiPatchParams {
    url: string;
    isValidateResponse?: boolean;
    data?: any;
    config?: AxiosRequestConfig;
}