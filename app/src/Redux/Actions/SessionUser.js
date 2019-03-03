import { getEmptyUserData } from 'Globals/SessionUser';

export const SET_DATA = 'SET_DATA';
export function setData(data) {
    return {
        type: SET_DATA,
        data,
    };
}

export function clearData() {
    return {
        type: SET_DATA,
        data: getEmptyUserData(),
    };
}
