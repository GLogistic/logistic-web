import { UserRoles } from "@/enums/user-role.enum";

export interface IUser {
    id: string;
    role: UserRoles;
}