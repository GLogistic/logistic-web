import { ISettlement } from "./settlement.interface";

export interface IRoute {
    id: string;
    startSettlement: ISettlement;
    endSettlement: ISettlement;
    distance: number;
}