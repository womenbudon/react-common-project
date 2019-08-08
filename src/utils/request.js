/**
 * @flow
 */

import { message } from 'antd'
import actionFactory from './actionFactory'

const messageByCode = (code: number) => {
  try {
    const codeLevel = code.toString()[0];
    let msgOut = message.info;
    switch (codeLevel) {
      case '0':
        // msgOut = message.success;
        break;
      case '1':
        // use default message out
        break;
      case '2':
        msgOut = message.warning;
        break;
      case '3':
        msgOut = message.error;
        break;
      default:
        break;
    }

    return msgOut;
  } catch (error) {
    return msg => msg;
  }
}

const config = {
  commonParams() {
    const shopId = sessionStorage.getItem('shopId')
    const appId = sessionStorage.getItem('appId')
    return { shopId, appId }
  },
  handleStatus(resp: Object) {
    const {
      code, data, message: msg,
    } = resp
    if (code === 0) {
      return data
    }
    messageByCode(code)(msg)
    throw msg
  },
}
const getFileConfig = {
  handleStatus(resp: Object) {
    const {
      retCode, filename, fileName, errInfo,
    } = resp
    if (retCode === 0) {
      const filePath = fileName.replace('../../', '');
      return { filename, filePath }
    }
    message.error(errInfo)
    throw errInfo
  },
}

const createAsyncAction = actionFactory(config)
const createEmptyAction = actionFactory()
const createDownloadAction = actionFactory(getFileConfig)

export { createAsyncAction, createEmptyAction, createDownloadAction }
