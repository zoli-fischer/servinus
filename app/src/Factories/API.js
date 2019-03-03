import API from 'Classes/API';
import Config from 'Globals/Config';

export function createAPI(authToken) {
    return new API(Config.api.url, authToken);
};

