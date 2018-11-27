import * as config from '../config'

export const create = ( token, user ) => fetch(config.BASE_URL + '/users', {
    method: 'POST', 
    headers: {
        'Authorization' : 'Bearer ' + token,
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(user)
    
})

