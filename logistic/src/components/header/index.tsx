'use client'

import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.scss';
import { IUser } from '@/interfaces/entity/user.interface';
import Link from 'next/link';
import { ApiRoute } from '@/enums/api-route.enum';
import { useSubmitLogout } from '@/api/auth/submit-logout.api';
import { UserRoles } from '@/enums/user-role.enum';
import { ModalWithOverlay } from '../modals/modalWithOverlay';
import { SignInForm } from '../forms/signIn';
import { SignUpForm } from '../forms/signUp';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const [user, setUser] = useState<IUser | null | undefined>(undefined);

    const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
    const [isOpenSignUpModal, setIsOpenSignUpModal] = useState<boolean>(false);

    const router = useRouter();

    const logoutMutation = useSubmitLogout();
    const logout = async () => {
        const result = await logoutMutation.mutateAsync();
        if (result.status < 400) {
            localStorage.removeItem('user');
            location.reload();
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userString = localStorage.getItem('user');

            if (!userString)
                setUser(null);

            const user: IUser = JSON.parse(userString!);

            setUser(user);
        }
    }, []);

    const headerTitleRole = useMemo(() => 
        typeof(user) != 'undefined'
        ? user == null
            ? 'Guest'
            : user.role == UserRoles.Admin
            ? 'Admin'
            : ''
        : '', 
    [user])
    
    const defaultPaginationParams ='page=1&pageSize=10';

    return (
        <>
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.headerTitle}>
                    <Link 
                    href='/' 
                    className={styles.headerTitle}>
                        GLogistic {headerTitleRole}
                    </Link>
                </div>
                {typeof(user) != 'undefined' && 
                (<>
                {user != null ? 
                (<nav>
                    <ul className={styles.pagesNavList}>
                        {user.role == UserRoles.Admin && 
                        (<li className={styles.pagesNavItem}>
                            <Link 
                            href={`/${ApiRoute.User}?${defaultPaginationParams}`} 
                            className={styles.navLink}>
                                Users
                            </Link>
                        </li>)}
                        <li className={styles.pagesNavItem}>
                            <Link 
                            href={`/${ApiRoute.Cargo}?${defaultPaginationParams}`} 
                            className={styles.navLink}>
                                Cargo
                            </Link>
                        </li>
                        <li className={styles.pagesNavItem}>
                            <Link 
                            href={`/${ApiRoute.Route}?${defaultPaginationParams}`} 
                            className={styles.navLink}>
                                Route
                            </Link>
                        </li>
                        <li className={styles.pagesNavItem}>
                            <Link 
                            href={`/${ApiRoute.Settlement}?${defaultPaginationParams}`} 
                            className={styles.navLink}>
                                Settlement
                            </Link>
                        </li>
                        <li className={styles.pagesNavItem}>
                            <button
                            className={styles.navButton}
                            onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>) : (
                    <>
                    <nav>
                        <ul className={styles.pagesNavList}>
                            <li className={styles.pagesNavItem}>
                                <button
                                className={styles.navButton}
                                onClick={() => setIsOpenSignInModal(true)}
                                >
                                    Sign In
                                </button>
                            </li>
                            <li className={styles.pagesNavItem}>
                            <button
                                className={styles.navButton}
                                onClick={() => setIsOpenSignUpModal(true)}
                                >
                                    Sign Up
                                </button>
                            </li>
                        </ul>
                    </nav>
                    </>
                )}
                </>)}

            </div>
        </div>
            <ModalWithOverlay
            isOpen={isOpenSignInModal}
            onClose={() => setIsOpenSignInModal(false)}
            >
                <SignInForm
                onSucces={() => {
                    setIsOpenSignInModal(false);
                    if (typeof window !== 'undefined') {
                        location.reload();
                    }
                }}
                />
            </ModalWithOverlay>
            <ModalWithOverlay
            isOpen={isOpenSignUpModal}
            onClose={() => setIsOpenSignUpModal(false)}
            >
                <SignUpForm
                onSucces={() => {
                    setIsOpenSignUpModal(false);
                    setIsOpenSignInModal(true);
                    router.refresh();
                }}
                />
            </ModalWithOverlay>
        </>
    )  
};