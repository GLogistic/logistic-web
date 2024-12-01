import { IEntityBase } from "./base/entity-base.interface";

export interface IUser extends IEntityBase {
    securityStamp: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: string;
}