/**
 * @flow
 */
import { ansyHandleFactory, handleActions } from 'utils/actionFactory'
import { createAsyncAction } from 'utils/request'
import { url } from './url'

const fetchUserListData = ansyHandleFactory('fetchUserList');
const addUserData = ansyHandleFactory('addUser');
const updateUserData = ansyHandleFactory('updateUser');
const deleteUserData = ansyHandleFactory('deleteUser');

const userRedux = handleActions(
  fetchUserListData('GET', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  addUserData('POST', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  updateUserData('PUT', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  deleteUserData('DELETE', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  {
    loading: false,
    list: [],
  },
);

export default userRedux;

/* ************************************************** 同步请求数据 ************************************************ */

/* ************************************************** 异步请求数据 *********************************************** */
type fetchUserListParams = {
  name?: string,
};

export const fetchUserList: (obj: fetchUserListParams) => disPromise<*> = createAsyncAction(
  `${url}/user`,
  fetchUserListData('GET'),
);

type addUserParams = {
  name: string,
  role: number,
  phone: string,
  email: string,
  address: string,
};

export const addUser: (obj: addUserParams) => disPromise<*> = createAsyncAction(
  `${url}/user`,
  addUserData('POST'),
);

type updateUserParams = {
  userid: string,
  name: string,
  role: number,
  phone: string,
  email: string,
  address: string,
  status: string,
};

export const updateUser: (obj: updateUserParams) => disPromise<*> = createAsyncAction(
  `${url}/user`,
  updateUserData('PUT'),
);

type deleteUserParams = {
  userid: string,
};
export const deleteUser: (obj: deleteUserParams) => disPromise<*> = createAsyncAction(
  `${url}/user`,
  updateUserData('DELETE'),
);
