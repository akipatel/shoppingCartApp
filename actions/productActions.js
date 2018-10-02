import { Actions } from '../constants/ActionTypes';
import products from '../api/products.json';

export function getProductList() {
  return {
    type    : Actions.PRODUCT_LIST,
    payload : products
  };
}

export function addNewProduct( newProduct = {} ) {
  return {
    type    : Actions.ADD_NEW_PRODUCT,
    payload : newProduct
  };
}
