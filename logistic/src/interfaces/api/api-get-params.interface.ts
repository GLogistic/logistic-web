import { AxiosRequestConfig } from "axios";

export interface IApiGetParams {
    url: string;
    isValidateResponse?: boolean;
    config?: AxiosRequestConfig;
}