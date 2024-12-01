export const validateApiError = (error: any) => {
    if (error.status == 401) {
        localStorage.removeItem('user');
        location.replace(`${process.env.NEXT_PUBLIC_HOST_URL}/`);
    } else if (error.status == 403) {
        location.replace(`${process.env.NEXT_PUBLIC_HOST_URL}/`);
    }
}