
export const getEmptyUserData = () => ({
    token: '',
    id: 0,
});

export const getStoredUserData = () => JSON.parse(localStorage.getItem('SessionUser.userData')) || getEmptyUserData();

export const clearStoredUserData = () => localStorage.setItem('SessionUser.userData', JSON.stringify(getEmptyUserData()));

export const setStoredUserData = userData => localStorage.setItem('SessionUser.userData', JSON.stringify(userData));
