import { AxiosRequestConfig } from "axios";

export interface IApiPutParams {
    url: string;
    isValidateResponse?: boolean;
    data?: any;
    config?: AxiosRequestConfig;
}