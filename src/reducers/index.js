import { combineReducers } from 'redux';
import authReducer from './auth';
import navReducer from './nav';

const rootReducer = combineReducers({
    authState: authReducer,
    navState: navReducer
});

export default rootReducer;
