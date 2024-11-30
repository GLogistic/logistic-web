import { useSubmitLogout } from '@/api/submit-logout.api';
import styles from  '@/components/header/styles.module.scss';
import { Route } from '@/enums/route.enum';
import Link from 'next/link';

export const UserNav = () => {
    const logout = async () => {
        localStorage.removeItem('user');
        await useSubmitLogout();
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
                    GLogistic
                </Link>
            </div>
            <nav>
                <ul className={styles.pagesNavList}>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href={`/${Route.Cargo}?${defaultPaginationParams}`} 
                        className={styles.navLink}>
                            Cargo
                        </Link>
                    </li>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href={`/${Route.Route}?${defaultPaginationParams}`} 
                        className={styles.navLink}>
                            Route
                        </Link>
                    </li>
                    <li className={styles.pagesNavItem}>
                        <Link 
                        href={`/${Route.Settlement}?${defaultPaginationParams}`} 
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

