import { useSubmitLogout } from '@/api/submit-logout.api';
import styles from  '@/components/header/styles.module.scss';
import { ApiRoute } from '@/enums/api-route.enum';
import Link from 'next/link';

export const AdminNav = () => {
    const logoutMutation = useSubmitLogout();
    const logout = async () => {
        const result = await logoutMutation.mutateAsync();
        if (result.status < 400) {
            localStorage.removeItem('user');
            location.reload();
        }
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
                        href={`/${ApiRoute.User}?${defaultPaginationParams}`} 
                        className={styles.navLink}>
                            Users
                        </Link>
                    </li>
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
            </nav>
        </div>
    </>
    );
};

