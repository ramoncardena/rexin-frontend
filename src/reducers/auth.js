import {  
    LOGIN_SUCCESS, 
    LOGOUT_SUCCESS,
    TOKEN_RECOVER,
    USER_RECOVER,
    SESSION_RECOVER
} from '../constants/action-types'


const INITIAL_STATE = {
    response: null,
    error: null,
    authToken: null,
    userId: null,
};

const applyLoginSuccess = (state, action) => (Object.assign({},{
    ...state,
    authToken: action.data.token,
    userId: action.data.user._id
}));


const applyLogoutSuccess = (state, action) => (Object.assign({},{
    ...state,
    authToken:  null,
    userId: null
}))


const applyTokenRecover = (state, action) => (Object.assign({},{
    ...state,
    authToken: action.token,
}));

const applyUserRecover = (state, action) => (Object.assign({},{
    ...state,
    userId: action.userId
}));

const applySessionRecover = (state, action) => (Object.assign({},{
    ...state,
    authToken: action.data.authToken,
    userId: action.data.userId
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
        case USER_RECOVER:{
            return applyUserRecover(state, action);
        }
        case SESSION_RECOVER: {
            return applySessionRecover(state, action);
        }
        default:
            return state
    }
}

export default authReducer