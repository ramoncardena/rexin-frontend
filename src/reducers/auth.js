import {  
    LOGIN_SUCCESS, 
    LOGOUT_SUCCESS,
    TOKEN_RECOVER
} from '../constants/action-types'


const INITIAL_STATE = {
    response: null,
    error: null,
    authToken: null
};

const applyLoginSuccess = (state, action) => (Object.assign({},{
    ...state,
    authToken: action.data.token
}));


const applyLogoutSuccess = (state, action) => (Object.assign({},{
    ...state,
    authToken:  null
}))


const applyTokenRecover = (state, action) => (Object.assign({},{
    ...state,
    authToken: action.token,
}));


function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:{
            return applyLoginSuccess(state, action);
        }
        case LOGOUT_SUCCESS:{
            return applyLogoutSuccess(state, action);
        }
        case TOKEN_RECOVER:{
            return applyTokenRecover(state, action);
        }
        default:
            return state
    }
}

export default authReducer