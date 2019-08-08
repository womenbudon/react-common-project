/**
 * @  lizhangrui
 * @flow
 */

import fetch from 'isomorphic-fetch'
import * as reduxActions from 'redux-actions'
import { message } from 'antd'

const { createAction, handleActions: oldHandleActions } = reduxActions

/** ************** develop模式下调用 */

/** ************** develop模式下调用 */

let STOPPER_PROMISE
(function () {
  /* eslint symbol-description: 0 */
  const STOP_VALUE = Symbol()// 构造一个Symbol以表达特殊的语义
  STOPPER_PROMISE = Promise.resolve(STOP_VALUE)
  /* eslint no-underscore-dangle: 0 */
  // $FlowFixMe
  Promise.prototype._then = Promise.prototype.then
  // eslint no-underscore-dangle:0
  // $FlowFixMe
  Promise.prototype._stop = function () {
    return STOPPER_PROMISE// 不是每次返回一个新的Promise，可以节省内存
  }
  // eslint no-underscore-dangle:0
  // $FlowFixMe
  Promise.prototype.then = function (onResolved, onRejected) {
    if (!onResolved) {
      // eslint no-underscore-dangle:0
      return this._then(value => value, onRejected)
    }
    // eslint no-underscore-dangle:0
    return this._then(value => value === STOP_VALUE ? STOP_VALUE : onResolved(value), onRejected)
  }
}())

/**
 * 创建三种异步action类型
 */
function createActionType(type: string): {pending: string, reject: string, accept: string} {
  return {
    pending: `${type} pending`,
    accept: `${type} accept`,
    reject: `${type} reject`,
    type,
  }
}

function getCommonParams() {
  const shopId = sessionStorage.getItem('shopId')
  const appId = sessionStorage.getItem('appId')
  return { shopId, appId }
}

/**
 * 获取头部信息
 */
function getHeaders() {
  const headers = new Headers()
  headers.append('accept', 'application/json')
  headers.append('content-type', 'application/json; charset=utf-8')
  return headers
}

/**
 * 处理post请求参数
 * @param {*} data
 */
function postParams(data) {
  return JSON.stringify(data)
}

/**
 * 处理get请求参数
 * @param {*} data
 */
function getParams(data) {
  const params = []
  Object.keys(data).forEach((item, index) => {
    let temp = data[item]
    if(Object.prototype.toString.call(temp) === '[object Array]'){
      temp = JSON.stringify(temp)
    }
    params.push(`${item}=${encodeURIComponent(temp)}`)
  })
  return params.length>0 ? `?${params.join('&')}` : ''
}

/**
 * 处理get请求参数
 * @param {*} data
 */
function getParamsNoEnCode(data) {
  const list = Object.keys(data)
  let params = []
  const arrayParams = []
  list.length > 0 && (params = list.map((item) => {
    return `${item}=${data[item]}`
  }))
  params = params.concat(arrayParams)
  return params.length>0 ? `?${params.join('&')}` : ''
}

function handleErrorCode(code) {
  if (code === 0) {
    return true
  }
  return false
}

/**
 * 处理返回状态码跟数据
 * @param {*} resp
 */
function defaultHandleStatus(resp: Object) {
  const { code, result } = resp
  if (handleErrorCode(code)) {
    return result
  }
  message.info(result)
  throw result
}

/**
 * 处理响应信息,status响应状态码还未添加
 * @param {*} resp
 */
function handleResponse(resp) {
  const { status, ok } = resp
  if (ok) {
    return resp.json()
  }
  const error = new Error(`${status} ${resp.statusText}`)
  throw error
}

/**
 * 处理请求方式
 * @param {*} method
 * @param {*} data
 * @param {*} api
 */
function handleMethod(method = 'POST', data, api, noencode?:boolean): { url: string, param: Object } {  // const apiUrl = window.apiUrl ? window.apiUrl : ''
  let defaultValue,
    url
  url = `${api}`
  switch (method) {
    case 'GET': {
      defaultValue = {
        url: noencode ? `${url}${getParamsNoEnCode(data)}` : `${url}${getParams(data)}`,
        param: { method: 'GET', credentials: 'same-origin', headers: getHeaders() },
      }
      break
    }
    case 'POST':
    case 'PUT':
    case 'DELETE': {
      const headers = getHeaders()
      const param = {
        method,
        credentials: 'same-origin',
        body: postParams(data),
        headers,
      }
      defaultValue = { url, param }
      break
    }
    default: {
      defaultValue = { url: '', param: {} }
      break
    }
  }
  return defaultValue
}

function fetchApi(options, timeout) {
  const { url, param } = options
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('请求超时'), timeout)
    fetch(url, param).then(resolve, reject)
  })
}

/**
 * 创建异步action
 */
function createAsyncAction(
  /* eslint no-shadow: 0 */
  getCommonParams: () => Object,
  // getCommonParams: Object,
  handleStatus: Function,
  api: string,
  actions: Object | string,
  method?: fetchMethod = 'GET',
  noencode?: boolean
) {
  // 三种状态的action
  const action:actionStatus = typeof actions === 'string' ? createActionType(actions) : (actions.actionType || actions)
  const [pending, accept, reject] = Object.keys(action).map(item => createAction(action[item]))
  return (obj?: Object, rj?: Function) => (dispatch: Dispatch) => {
    dispatch(pending())
    const req = handleMethod(actions.method || method, { ...obj, ...getCommonParams() }, api, noencode)

    return fetchApi(req, 60000)
      .then(response => handleResponse(response))
      .then((data) => {
        data = handleStatus(data)
        dispatch(accept(data || {}))
        return data
      })
      .catch((err) => {
        rj && rj(err)
        if (err === '请求超时') {
          message.info(err);
        }
        dispatch(reject())
        return STOPPER_PROMISE
      })
  }
}

function handleActions(...args: Array<Object>) {
  const obj = {}
  const { length } = args
  const initialState = args[length - 1]
  for (let i = 0; i < length - 1; i += 1) {
    Object.keys(args[i]).map((item) => { obj[item] = args[i][item] })
  }
  return oldHandleActions(obj, initialState)
}

const ansyHandleFactory = (name: string) => (
  method: fetchMethod,
  newReducers?: { pending?: Function, reject?: Function, accept?: Function },
): Object => {
  const actionType = createActionType(`${method}_${name}`)
  if (newReducers) {
    const obj = {
      [actionType.pending]: newReducers.pending || (state => ({ ...state, loading: true })),
      [actionType.reject]: newReducers.reject || (state => ({ ...state, loading: false })),
      [actionType.accept]: newReducers.accept || (state => ({ ...state, loading: false })),
    }
    return obj
  }
  return { actionType, method }
}

function actionFactory(config: {commonParams?: (any)=>Object, handleStatus?: Function } = {}) {
  const { commonParams = getCommonParams, handleStatus = defaultHandleStatus } = config
  return (
    api: string,
    actions: Object | string,
    method?: fetchMethod = 'GET',
    noencode?: boolean
  ) => createAsyncAction(commonParams, handleStatus, api, actions, method, noencode)
}

type basicObj = {
  name: string,
  value: mixed
}

type actionStatus = {
  pending: string,
  reject: string,
  accept: string
}

type fetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type fetchAction ={
  pending: string, reject: string, accept: string
}

export type restfulAction = ()=>fetchAction & Object

export {
  // ...reduxActions,
  reduxActions,
  createAsyncAction,
  createActionType,
  handleActions,
  ansyHandleFactory,
}

export default actionFactory
