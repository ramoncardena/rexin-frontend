import * as config from '../config'

export const create = (secret, key, user ) => fetch(config.BASE_URL + '/users', {
    method: 'POST', 
    headers: {
        'Authorization' : 'Basic ' + new Buffer(key + ':' + secret).toString('base64'),
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(user)
    
})

