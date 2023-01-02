import {createStore  , applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import Reducers from './reducers'
import Middleware from 'redux-thunk'

const initialState = {}
const store = createStore(
    
    Reducers,
    initialState,
    composeWithDevTools(applyMiddleware(Middleware))
)

export default store