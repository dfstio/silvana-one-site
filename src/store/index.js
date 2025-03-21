import thunk from 'redux-thunk'
// import createRootReducer from "./rootReducer";
import rootReducer from './rootReducer'
// import { createBrowserHistory } from 'history'
import {createStore, applyMiddleware, compose} from 'redux'
import {env} from '../configs/env'

const middlewares = [thunk]
const initialState = {}

let composeEnhancers
if (env === 'production') {
  composeEnhancers = compose
} else {
  composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 20,
      })) ||
    compose
}
const enhancer = composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(rootReducer, initialState, enhancer)

export default store
