import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import documentReducer from "./reducers/documentReducer";
import {loadState, saveState} from "../util/localStorage";

const middleware = [thunk];

const reducers = combineReducers({
    data: dataReducer,
    user: userReducer,
    document: documentReducer
});

const persistedState = loadState();

const store = createStore(
    reducers, 
    persistedState,
    compose(
        applyMiddleware(...middleware),
        // Remove before build process.
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;