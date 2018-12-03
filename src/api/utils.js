import * as config from '../config';

export const sendcontact = payload =>
    fetch(config.BASE_URL + '/utils/sendcontact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
