import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

// import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
// import uiReducer from './reducers/uiReducer'

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    data: dataReducer,
});

const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        // Remove before build process.
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;