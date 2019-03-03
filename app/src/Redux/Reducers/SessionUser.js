import { SET_DATA } from 'Actions/SessionUser';
import { getStoredUserData, getEmptyUserData, setStoredUserData } from 'Globals/SessionUser';

const sessionUser = (state = {
    data: getStoredUserData(),
}, action) => {
    switch (action.type) {
    case SET_DATA:
        const data = Object.assign({}, getEmptyUserData(), action.data);
        setStoredUserData(data);
        return Object.assign({}, state, {
            data,
        });
    default:
        return state;
    }
};

export default sessionUser;
