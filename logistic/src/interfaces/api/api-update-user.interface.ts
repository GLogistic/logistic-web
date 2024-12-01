import { IApiUpdateEntityBase } from "./base/api-update-entity-base.interface";

export interface IApiUpdateUser extends IApiUpdateEntityBase {
    securityStamp: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}