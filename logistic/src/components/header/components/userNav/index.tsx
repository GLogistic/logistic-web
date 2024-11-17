import { SubmitLogout } from '@/api/submit-logout.api';
import styles from  '@/components/header/styles.module.scss';
import Link from 'next/link';

export const UserNav = () => {
    const logout = async () => {
        localStorage.removeItem('user');
        await SubmitLogout();
        location.reload();
    };
    return (
    <>
        <div className={styles.contentContainer}>
            <div className={styles.headerTitle}>
                <Link 
                href='/' 
                className={styles.headerTitle}>
                    GLogistic
                </Link>
            </div>
            <nav>
                <ul className={styles.pagesNavList}>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href='/cargo' 
                        className={styles.navLink}>
                            Cargo
                        </Link>
                    </li>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href='/route'
                        className={styles.navLink}>
                            Route
                        </Link>
                    </li>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href='/settlement'
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
            </nav>
        </div>
    </>
    );
};

