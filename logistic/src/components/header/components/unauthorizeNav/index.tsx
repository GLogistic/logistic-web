'use client'

import styles from  '@/components/header/styles.module.scss';
import { useState } from 'react';
import { ModalWithOverlay } from '@/components/modals/modalWithOverlay';
import { SignInForm } from '@/components/forms/signIn';
import { useRouter } from 'next/navigation';
import { SignUpForm } from '@/components/forms/signUp';
import Link from 'next/link';

export const UnauthorizedNav = () => {
    const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
    const [isOpenSignUpModal, setIsOpenSignUpModal] = useState<boolean>(false);

    const router = useRouter();

    return (
    <>
        <div className={styles.contentContainer}>
            <div className={styles.headerTitle}>
                <Link 
                href='/' 
                className={styles.headerTitle}>
                    GLogistic Guest
                </Link>
            </div>
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
        </div>
        {isOpenSignInModal && 
            <ModalWithOverlay
            onClose={() => setIsOpenSignInModal(false)}
            >
                <SignInForm
                onSucces={() => {
                    setIsOpenSignInModal(false);
                    if (typeof window !== undefined) {
                        location.reload();
                    }
                }}
                />
            </ModalWithOverlay>
        }
        {isOpenSignUpModal && 
            <ModalWithOverlay
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
        }
    </>
    );
};

