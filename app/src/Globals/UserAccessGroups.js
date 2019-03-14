export const ACCESS_GROUP_UPLOAD = 'upload';
export const ACCESS_GROUP_USERS = 'users';
export const ACCESS_GROUP_ADULT = 'adult';

export function hasUserAccess(userData, accessGroup) {
    return userData.accessGroups.indexOf(accessGroup) > -1;
}
