'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { UnauthorizedNav } from './components/unauthorizeNav';
import { UserNav } from './components/userNav';
import { IUser } from '@/interfaces/user.interface';
import { UserRoles } from '@/enums/user-role.enum';
import { AdminNav } from './components/adminNav';

export const Header = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userString = localStorage.getItem('user');

            if (!userString)
                setUser(null);

            const user: IUser = JSON.parse(userString!);

            setUser(user);
        }
    }, []);

    return (
        <div className={styles.mainContainer}>
            {user == null 
                ? <UnauthorizedNav/>
                : user.role == UserRoles.User
                    ? <UserNav/>
                    : <AdminNav/>}
        </div>
    )  
};