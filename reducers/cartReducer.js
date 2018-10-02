import { Actions } from '../constants/ActionTypes';

// CART REDUCERS
const cartReducer = (state={cart: []}, action) => {
  switch(action.type) {
    case Actions.ADD_TO_CART:
    case Actions.REMOVE_FROM_CART:
      return {
        ...state,
        cart:[...action.payload],    //  ...action.payload to avoid more indexing in new inserted array object
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
    break;

    // case Actions.REMOVE_FROM_CART:
    //   return {
    //     ...state,
    //     cart:[...action.payload],    //  ...action.payload to avoid more indexing in new inserted array object
    //     totalAmount:totals(action.payload).amount,
    //     totalQty: totals(action.payload).qty
    //   }
    // break;

    case Actions.UPDATE_CART:
      return {
        ...state,
        cart:action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
    break;
  }

  return state
}

// CALCULATE TOTALS
export function totals(payloadArr) {
  const totalAmount = payloadArr.map(function(cartArr){
    return cartArr.price * cartArr.quantity;
  }).reduce(function(a, b) {
    return a + b;
  }, 0); //start summing from index0

  const totalQty = payloadArr.map(function(qty){
    return qty.quantity;
  }).reduce(function(a, b) {
    return a + b;
  }, 0);

  return {
    amount:totalAmount.toFixed(2),
    qty:totalQty
  }
}

export default cartReducer;
