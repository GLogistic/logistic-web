import { useFormContext } from "react-hook-form";

import styles from './styles.module.scss';
import { ChangeEvent, useMemo } from "react";
import { SubmitButton } from "@/components/buttons/submitButton";
import { FormField } from "@/components/forms/field";
import { IApiUpdateRoute } from "@/interfaces/api/api-update-route.interface";
import { useGetAllSettlements } from "@/api/entities/settlement.api";
import { IEntityDropdownListItem } from "@/interfaces/entity-dropdown-list-item.interface";
import { ISettlement } from "@/interfaces/entity/settlement.interface";
import { FormFieldWithEntityDropdownList } from "@/components/forms/fieldWithDropdownList";

export const UpdateRouteFields = () => {
    const { 
        register,
        formState,
        trigger,
        setValue,
        watch,
    } = useFormContext<IApiUpdateRoute>();

    const changeInputField = (field: 'distance') => 
        (e: ChangeEvent<HTMLInputElement>) => {
            setValue(field, Number(e.target.value));
            trigger(field);
    }

    const changeFieldWithDropdown = (field: 'startSettlementId' | 'endSettlementId', value: string) => {
        setValue(field, value);
        trigger(field);
    }

    const { data } = useGetAllSettlements();

    const settlementsForField = useMemo<IEntityDropdownListItem[]>(() => {
        if (!data || !data.data)
            return [];

        const settlements: ISettlement[] = data.data;

        const modifiedSettlements: IEntityDropdownListItem[] = [];

        for (let i = 0; i < settlements.length; i++) {
            const currentSettlement = settlements[i];
            modifiedSettlements.push({
                id: currentSettlement.id,
                title: currentSettlement.title
            });
        }

        return modifiedSettlements;
    }, [data])

    const selectedStartSettlementId = watch('startSettlementId');
    const selectedEndSettlementId = watch('endSettlementId');

    const selectedStartSettlementTitle = useMemo(() => 
        settlementsForField.find(settlement => settlement.id == selectedStartSettlementId)?.title ?? '', 
    [selectedStartSettlementId, data]);
    const selectedEndSettlementTitle = useMemo(() => 
        settlementsForField.find(settlement => settlement.id == selectedEndSettlementId)?.title ?? '', 
    [selectedEndSettlementId, data]);
    
    return (
        <div className={styles.fieldsMainContainer}>
            <div className={styles.fieldsContentContainer}>
                <FormField
                type='number'
                placeholder='Enter distance'
                register={() => register('distance')}
                onChange={changeInputField('distance')}
                error={formState.errors.distance}
                label='Distance'
                />
                <FormFieldWithEntityDropdownList
                items={settlementsForField}
                selectedItemTitle={selectedStartSettlementTitle}
                onChange={(item) =>
                    changeFieldWithDropdown('startSettlementId', item.id)}
                error={formState.errors.startSettlementId}
                label='Start settlement'
                />
                <FormFieldWithEntityDropdownList
                items={settlementsForField}
                selectedItemTitle={selectedEndSettlementTitle}
                onChange={(item) =>
                    changeFieldWithDropdown('endSettlementId', item.id)}
                error={formState.errors.endSettlementId}
                label='End settlement'
                />  
            </div>
            <SubmitButton
            disabled={!formState.isValid}
            className={styles.submitButton}
            >
                Update
            </SubmitButton>
            <div className={styles.errorContainer}>
                <p className={styles.error}>
                    {formState.errors.root?.message}
                </p>
            </div>
        </div>
    );
}