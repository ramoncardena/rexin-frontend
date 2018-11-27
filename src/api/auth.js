import * as config from '../config'

export const login = (credentials) => fetch(config.BASE_URL + '/login', {
    method: 'POST',
    mode: 'cors', 
    headers: {
        'Content-Type' : 'application/json'
    },
    body:  JSON.stringify(credentials)  
})

export const register = (user) => fetch(config.BASE_URL + '/register', {
    method: 'POST',
    mode: 'cors', 
    headers: {
        'Content-Type' : 'application/json'
    },
    body:  JSON.stringify(user)  
})

export const verify = (id) => fetch(config.BASE_URL + '/verify', {
    method: 'POST',
    mode: 'cors', 
    headers: {
        'Content-Type' : 'application/json'
    },
    body:  JSON.stringify(id)  
})