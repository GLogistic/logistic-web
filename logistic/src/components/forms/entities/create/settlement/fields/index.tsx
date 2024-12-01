import { useFormContext } from "react-hook-form";

import styles from './styles.module.scss';
import { ChangeEvent } from "react";
import { SubmitButton } from "@/components/buttons/submitButton";
import { FormField } from "@/components/forms/field";
import { IApiCreateSettlement } from "@/interfaces/api/api-create-settlement.interface";

export const CreateSettlementFields = () => {
    const { 
        register,
        formState,
        trigger,
        setValue,
    } = useFormContext<IApiCreateSettlement>();

    const changeField = (field: 'title') => 
        (e: ChangeEvent<HTMLInputElement>) => {
            setValue(field, e.target.value);
            trigger(field);
    }
    
    return (
        <div className={styles.fieldsMainContainer}>
            <div className={styles.fieldsContentContainer}>
                <FormField
                type='text'
                placeholder='Enter title'
                register={() => register('title')}
                onChange={changeField('title')}
                error={formState.errors.title}
                label='Title'
                />
            </div>
            <SubmitButton
            disabled={!formState.isValid}
            className={styles.submitButton}
            >
                Create
            </SubmitButton>
            <div className={styles.errorContainer}>
                <p className={styles.error}>
                    {formState.errors.root?.message}
                </p>
            </div>
        </div>
    );
}