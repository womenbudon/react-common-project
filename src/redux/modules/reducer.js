/**
 * @flow
 */
import { combineReducers } from 'redux';
import loginRedux from './loginRedux';
import userRedux from './userRedux';
import roleRedux from './roleRedux';
import systemReducer from './systemRedux';

const rootReducer = combineReducers({
    loginRedux,
    userRedux,
    roleRedux,
    systemReducer,
});

export default rootReducer;
