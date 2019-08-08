/**
 * @flow
 */
import { ansyHandleFactory, handleActions } from 'utils/actionFactory'
import { createAsyncAction } from 'utils/request'
import { url } from './url'

const loginData = ansyHandleFactory('login')

const loginRedux = handleActions(
  loginData('POST', {
    pending: (state) => ({ ...state, Loading: true }),
    accept: (state) => ({ ...state, Loading: false }),
    reject: (state) => ({ ...state, Loading: false }),
  }),
  {
    Loading: false,
  },
);
export default loginRedux;

/* ************************************************** 同步请求数据 ************************************************ */

/* ************************************************** 异步请求数据 *********************************************** */
type loginParams = {
  username: string,
  password: string,
};
export const loginPlarform: (obj: loginParams) => disPromise<*> = createAsyncAction(
  `${url}/login`,
  loginData('POST'),
);
