import {  
    NAVIGATION_ENDED
} from '../constants/action-types'


const INITIAL_STATE = {
    navPath: null
};

const applyNavigationEnded = (state, action) => (Object.assign({},{
    ...state,
    navPath: action.path
}));




function navReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case NAVIGATION_ENDED:{
            return applyNavigationEnded(state, action);
        }
        default:
            return state
    }
}

export default navReducer