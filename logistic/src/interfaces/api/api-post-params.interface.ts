import { AxiosRequestConfig } from "axios";

export interface IApiPostParams {
    url: string;
    isValidateResponse?: boolean;
    data?: any;
    config?: AxiosRequestConfig;
}