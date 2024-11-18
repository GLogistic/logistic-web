import { IPaginationParams } from "./pagination-params.interface";

export interface IGetSettlementsRequest extends IPaginationParams {
    titleFilter?: string | undefined; 
}