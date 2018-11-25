import * as config from '../config'

export const login = (credentials) => fetch(config.BASE_URL + '/users/login', {
    method: 'POST',
    mode: 'cors', 
    headers: {
        'Content-Type' : 'application/json'
    },
    body:  JSON.stringify(credentials)
    
})