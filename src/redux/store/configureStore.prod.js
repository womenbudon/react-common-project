import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../modules/reducer'

const enhancer = compose(applyMiddleware(thunkMiddleware))

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
