import { IApiUpdateEntityBase } from "./base/api-update-entity-base.interface";

export interface IApiUpdateRoute extends IApiUpdateEntityBase {
    startSettlementId: string;
    endSettlementId: string;
    distance: number;
}