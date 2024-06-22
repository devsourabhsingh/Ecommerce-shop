import { combineReducers } from "redux";
import {
  addToCartReducers,
  productReducers,
  selectedProductReducers,
  selectedProductIdsReducers,
} from "./ProductReducers";

const reducers = combineReducers({
  allProducts: productReducers,
  singleProduct: selectedProductReducers,
  addCart: addToCartReducers,
  productIds: selectedProductIdsReducers,
});
export default reducers;
