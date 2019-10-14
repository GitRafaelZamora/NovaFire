import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer';
import documentReducer from "./reducers/documentReducer";
import uiReducer from "./reducers/uiReducer";
import { loadState, saveState } from "../util/localStorage";


const middleware = [thunk];

const reducers = combineReducers({
    UI: uiReducer,
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
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;