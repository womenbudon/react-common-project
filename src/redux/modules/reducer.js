/**
 * @flow
 */
import { combineReducers } from 'redux';
import loginRedux from './loginRedux';
import userRedux from './userRedux';
import roleRedux from './roleRedux';

const rootReducer = combineReducers({
  loginRedux,
  userRedux,
  roleRedux,
});

export default rootReducer;
