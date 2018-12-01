import * as config from '../config'

export const retrieve = (token) => fetch(config.BASE_URL + '/profile', {
    method: 'GET',
    mode: 'cors', 
    headers: {
        'Authorization' : 'Bearer ' + token
    }
})

export const patch = (token, data) => fetch(config.BASE_URL + '/profile', {
    method: 'PATCH',
    mode: 'cors', 
    headers: {
        'Authorization' : 'Bearer ' + token,
        'Content-Type' : 'application/json'
    },
    body:  JSON.stringify(data)  
})


