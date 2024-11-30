import { ISignInData } from "@/interfaces/signIn.interface";
import { useFormContext } from "react-hook-form";
import { FormField } from "../../field";

import styles from './styles.module.scss';
import { ChangeEvent } from "react";
import { SubmitButton } from "@/components/buttons/submitButton";

export const SignInFields = () => {
    const { 
        register,
        formState,
        trigger,
        setValue,
    } = useFormContext<ISignInData>();

    const changeField = (field: 'Email' | 'Password') => 
        (e: ChangeEvent<HTMLInputElement>) => {
            setValue(field, e.target.value);
            trigger(field);
    }
    
    return (
        <div className={styles.fieldsMainContainer}>
            <div className={styles.fieldsContentContainer}>
                <FormField
                type='email'
                placeholder='Enter your email'
                register={() => register('Email')}
                onChange={changeField('Email')}
                error={formState.errors.Email}
                label='Email'
                />
                <FormField
                type='password'
                placeholder='Enter your password'
                register={() => register('Password')}
                onChange={changeField('Password')}
                error={formState.errors.Password}
                label='Password'
                />
            </div>
            <SubmitButton
            disabled={!formState.isValid}
            className={styles.submitButton}
            >
                Sign in
            </SubmitButton>
            <div className={styles.errorContainer}>
                <p className={styles.error}>
                    {formState.errors.root?.message}
                </p>
            </div>
        </div>
    );
}