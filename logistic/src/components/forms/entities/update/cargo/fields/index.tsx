import { useFormContext } from "react-hook-form";

import styles from './styles.module.scss';
import { ChangeEvent } from "react";
import { SubmitButton } from "@/components/buttons/submitButton";
import { FormField } from "@/components/forms/field";
import { IApiUpdateCargo } from "@/interfaces/api/api-update-cargo.interface";

export const UpdateCargoFields = () => {
    const { 
        register,
        formState,
        trigger,
        setValue,
    } = useFormContext<IApiUpdateCargo>();

    const changeField = (field: 'title' | 'weight' | 'registrationNumber') => 
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
                <FormField
                type='number'
                placeholder='Enter weight'
                register={() => register('weight')}
                onChange={changeField('weight')}
                error={formState.errors.weight}
                label='Weight'
                />
                <FormField
                type='text'
                placeholder='Enter registration number'
                register={() => register('registrationNumber')}
                onChange={changeField('registrationNumber')}
                error={formState.errors.registrationNumber}
                label='Registration number'
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