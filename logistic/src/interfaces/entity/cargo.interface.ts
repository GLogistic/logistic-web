import { IEntityBase } from "./base/entity-base.interface";

export interface ICargo extends IEntityBase {
    title: string;
    weight: number;
    registrationNumber: string;
}