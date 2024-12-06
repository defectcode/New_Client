export const isSessionValid = (): boolean => {
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    if (!sessionExpiry) return false;

    const currentTime = new Date().getTime();
    return currentTime <= parseInt(sessionExpiry);
};
