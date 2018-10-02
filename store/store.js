import { combineReducers, createStore, applyMiddleware } from 'redux';

import promise 			from "redux-promise-middleware";
import thunk 			from "redux-thunk";
import { createLogger } from "redux-logger";

import productsReducer from '../reducers/productsReducer';
import cartReducer from '../reducers/cartReducer';

const reducers = combineReducers({
	products   		:	productsReducer,
	cart					: cartReducer
})

const middleware 	= applyMiddleware(  promise(),  thunk,  createLogger() );
const store 			= createStore( reducers, middleware );

export default store;
