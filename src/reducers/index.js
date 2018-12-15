import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth';
import navReducer from './nav';

export default history =>
    combineReducers({
        router: connectRouter(history),
        authState: authReducer,
        navState: navReducer
    });
