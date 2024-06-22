import { ActionType } from "./Constant/ActionType";

export const setProducts = (products) => {
  return {
    type: ActionType.SET_PRODUCTS,
    payload: products,
  };
};
export const selectedProducts = (product) => {
  return {
    type: ActionType.SELECTED_PRODUCT,
    payload: product,
  };
};
export const selectedItemsIds = (id) => {
  return {
    type: ActionType.SELECTED_ITEMS_IDS,
    payload: id,
  };
};

export const removeSelectedProductIds = (id) => {
  return {
    type: ActionType.REMOVE_SELECTED_PRODUCT_IDS,
    payload: id,
  };
};

export const removeProducts = () => {
  return {
    type: ActionType.REMOVE_SELECTED_PRODUCT,
  };
};

export const removeAllSelectedProductsIds = () => {
  return {
    type: ActionType.ALL_REMOVE_SELECTED_PRODUCT_IDS,
  };
};
export const addToCart = (Cart) => {
  return {
    type: ActionType.ADD_TO_CART,
    payload: Cart,
  };
};
export const removeCart = (id) => {
  return {
    type: ActionType.REMOVE_FROM_CART,
    payload: id,
  };
};
export const allRemoveCart = () => {
  return {
    type: ActionType.ALL_CART_REMOVE,
  };
};
export const setIncrease = (id) => {
  return {
    type: ActionType.INCREMENT,
    payload: id,
  };
};
export const setDecrease = (id) => {
  return {
    type: ActionType.DECREMENT,
    payload: id,
  };
};
