import { SubmitLogout } from '@/api/submit-logout.api';
import styles from  '@/components/header/styles.module.scss';
import Link from 'next/link';

export const AdminNav = () => {
    const logout = async () => {
        localStorage.removeItem('user');
        await SubmitLogout();
        location.reload();
    };

    const defaultPaginationParams ='page=1&pageSize=10';
    return (
    <>
        <div className={styles.contentContainer}>
            <div className={styles.headerTitle}>
                <Link 
                href='/' 
                className={styles.headerTitle}>
                    GLogistic Admin
                </Link>
            </div>
            <nav>
                <ul className={styles.pagesNavList}>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href={`/users?${defaultPaginationParams}`} 
                        className={styles.navLink}>
                            Users
                        </Link>
                    </li>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href={`/cargos?${defaultPaginationParams}`} 
                        className={styles.navLink}>
                            Cargo
                        </Link>
                    </li>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href={`/routes?${defaultPaginationParams}`} 
                        className={styles.navLink}>
                            Route
                        </Link>
                    </li>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href={`/settlements?${defaultPaginationParams}`} 
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

