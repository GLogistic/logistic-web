import { IApiUpdateEntityBase } from "./base/api-update-entity-base.interface";

export interface IApiUpdateCargo extends IApiUpdateEntityBase {
    title: string;
    weight: number;
    registrationNumber: string;
}