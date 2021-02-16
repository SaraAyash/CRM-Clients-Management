import { createStore, combineReducers, applyMiddleware } from 'redux';
import clientReducer from './Reducers/Client'
import productReducer from './Reducers/Product'
import { dd$ToCompanyName } from './MiddleWares/crud';
import { save, load } from "redux-localstorage-simple"

const reducer = combineReducers({ clientReducer,productReducer });

const createStoreWithMiddleware = applyMiddleware(
    save())(createStore)

/*
Loading from LocalStorage happens during
creation of the Redux store.
*/
const store = createStoreWithMiddleware(
    reducer,
    load() // Loading done here
)


// const store = createStore(reducer,applyMiddleware(add$ToCompanyName));
window.store = store;
export default store;

