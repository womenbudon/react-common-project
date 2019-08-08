/**
 * @flow
 */
import { ansyHandleFactory, handleActions } from 'utils/actionFactory'
import { createAsyncAction } from 'utils/request'
import { url } from './url'

const fetchRoleListData = ansyHandleFactory('fetchRoleList');
const addRoleData = ansyHandleFactory('addRole');
const updateRoleData = ansyHandleFactory('updateRole');
const deleteRoleData = ansyHandleFactory('deleteRole');

const RoleRedux = handleActions(
  fetchRoleListData('GET', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  addRoleData('POST', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  updateRoleData('PUT', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  deleteRoleData('DELETE', {
    accept: (state) => ({ ...state, loading: false }),
  }),
  {
    loading: false,
    list: [],
  },
);

export default RoleRedux;

/* ************************************************** 同步请求数据 ************************************************ */

/* ************************************************** 异步请求数据 *********************************************** */
type fetchRoleListParams = {
  rolename?: string,
};

export const fetchRoleList: (obj: fetchRoleListParams) => disPromise<*> = createAsyncAction(
  `${url}/role`,
  fetchRoleListData('GET'),
);

type addRoleParams = {
  rolename: string,
  roledesc: string,
};

export const addRole: (obj: addRoleParams) => disPromise<*> = createAsyncAction(
  `${url}/role`,
  addRoleData('POST'),
);

type updateRoleParams = {
  roleid: string,
  status: string,
  rolename: string,
  roledesc: string,
};

export const updateRole: (obj: updateRoleParams) => disPromise<*> = createAsyncAction(
  `${url}/role`,
  updateRoleData('PUT'),
);

type deleteRoleParams = {
  roleid: string,
};
export const deleteRole: (obj: deleteRoleParams) => disPromise<*> = createAsyncAction(
  `${url}/role`,
  updateRoleData('DELETE'),
);
