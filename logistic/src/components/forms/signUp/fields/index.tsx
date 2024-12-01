import { useFormContext } from "react-hook-form";
import { FormField } from "../../field";

import styles from './styles.module.scss';
import { IApiSignUpData } from "@/interfaces/api/api-signUp-data.interface";
import { ChangeEvent } from "react";
import { SubmitButton } from "@/components/buttons/submitButton";

export const SignUpFields = () => {
    const { 
        register,
        formState,
        setValue,
        trigger,
    } = useFormContext<IApiSignUpData>();

    const changeField = (field: 'FirstName' | 'LastName' | 'UserName' | 'Email' | 'Password') => 
        (e: ChangeEvent<HTMLInputElement>) => {
            setValue(field, e.target.value);
            trigger(field);
    }

    return (
        <div className={styles.fieldsMainContainer}>
            <div className={styles.fieldsContentContainer}>
                <FormField
                type='text'
                placeholder='Enter your first name'
                register={() => register('FirstName')}
                onChange={changeField('FirstName')}
                error={formState.errors.FirstName}
                label='First name'
                />
                <FormField
                type='text'
                placeholder='Enter your last name'
                register={() => register('LastName')}
                onChange={changeField('LastName')}
                error={formState.errors.LastName}
                label='Last name'
                />   
                <FormField
                type='text'
                placeholder='Enter your user name'
                register={() => register('UserName')}
                onChange={changeField('UserName')}
                error={formState.errors.UserName}
                label='User name'
                />              
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
                Sign Up
            </SubmitButton>
        </div>
    );
}