import { IEntityBase } from "./base/entity-base.interface";
import { ISettlement } from "./settlement.interface";

export interface IRoute extends IEntityBase {
    startSettlement: ISettlement;
    endSettlement: ISettlement;
    distance: number;
}