import { Actions } from '../constants/ActionTypes';

const productsReducer = ( state = {}, action ) => {
	switch( action.type ) {
		case Actions.PRODUCT_LIST:
			state = {...state, products : action.payload}
			break;

		case Actions.ADD_NEW_PRODUCT:
		 	state = {...state, products:[...state.products, ...action.payload]} //  ...action.payload to avoid more indexing in new inserted array object
			break;

		default:
			return state;
	}

	return state;
}

export default productsReducer;
