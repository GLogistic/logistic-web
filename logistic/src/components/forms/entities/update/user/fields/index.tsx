import { useFormContext } from "react-hook-form";

import styles from './styles.module.scss';
import { ChangeEvent } from "react";
import { SubmitButton } from "@/components/buttons/submitButton";
import { FormField } from "@/components/forms/field";
import { IApiUpdateUser } from "@/interfaces/api/api-update-user.interface";

export const UpdateUserFields = () => {
    const { 
        register,
        formState,
        trigger,
        setValue,
    } = useFormContext<IApiUpdateUser>();

    const changeField = (field: 'firstName' | 'lastName' | 'userName' | 'email') => 
        (e: ChangeEvent<HTMLInputElement>) => {
            setValue(field, e.target.value);
            trigger(field);
    }
    
    return (
        <div className={styles.fieldsMainContainer}>
            <div className={styles.fieldsContentContainer}>
                <FormField
                type='text'
                placeholder='Enter first name'
                register={() => register('firstName')}
                onChange={changeField('firstName')}
                error={formState.errors.firstName}
                label='First name'
                />
                <FormField
                type='text'
                placeholder='Enter last name'
                register={() => register('lastName')}
                onChange={changeField('lastName')}
                error={formState.errors.lastName}
                label='Last name'
                />
                <FormField
                type='text'
                placeholder='Enter user name'
                register={() => register('userName')}
                onChange={changeField('userName')}
                error={formState.errors.userName}
                label='User name'
                />
                <FormField
                type='text'
                placeholder='Enter email'
                register={() => register('email')}
                onChange={changeField('email')}
                error={formState.errors.email}
                label='Email'
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