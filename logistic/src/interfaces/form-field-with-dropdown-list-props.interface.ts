import { FieldError } from "react-hook-form";
import { IEntityBase } from "./entity/base/entity-base.interface";
import { IEntityDropdownListItem } from "./entity-dropdown-list-item.interface";

export interface IFormFieldWithDropdownListProps {
    items: IEntityDropdownListItem[],
    selectedItemTitle: string, 
    onChange: (item: IEntityBase) => void | undefined;
    error: FieldError | undefined;
    label?: string | undefined;
    errorClassName?: string | undefined;
    fieldLabelClassName?: string | undefined;
    fieldClassName?: string | undefined;
    fieldContainerClassName?: string | undefined;
}