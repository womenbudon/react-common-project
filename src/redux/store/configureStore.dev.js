import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import rootReducer from '../modules/reducer'

const enhancer = compose(
  // 你要使用的中间件，放在前面
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
