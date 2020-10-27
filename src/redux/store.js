import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'

let middleWare = applyMiddleware(thunk)
if (process.env.NODE_ENV === 'development') {
  middleWare = composeWithDevTools(middleWare)
}
export default createStore(reducers, middleWare)