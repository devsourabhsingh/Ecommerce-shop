import React from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  setIncrease,
  setDecrease,
  removeCart,
  removeSelectedProductIds,
} from "../../Redux/Actions/ProductActions";

const CartProductItem = ({ id, image, price, category, title, newCart }) => {
  const dispatch = useDispatch();

  // Increase selected product item quantity in cart
  const handleIncreaseQuantity = (item) => {
    dispatch(setIncrease(item));
    toast.success("increase Quantity");
  };

  // Reduce selected product item quantity in cart
  const handleReduceQuantity = (item) => {
    dispatch(setDecrease(item));
    toast.success("less Quantity");
  };

  // Remove item from cart
  const handleRemoveCart = (id) => {
    dispatch(removeCart(id));
    dispatch(removeSelectedProductIds(id));
  };

  return (
    <>
      <div className="row mb-4 d-flex justify-content-between align-items-center">
        <div className="col-md-2 col-lg-2 col-xl-2">
          <img
            src={image}
            className="img-fluid rounded-3"
            alt="Cotton T-shirt"
          />
        </div>
        <div className="col-md-3 col-lg-3 col-xl-3">
          <h6 className="text-muted">{category}</h6>
          <h6 className="text-black mb-0">{title}</h6>
        </div>
        <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-end">
          <button
            className="btn btn-link px-3"
            onClick={() => handleReduceQuantity(newCart.id)}
          >
            <i className="bi bi-dash minus-icon collect-item"></i>
          </button>
          <p className="new-count-number">{newCart.count || 1}</p>
          <button
            className="btn btn-link px-3"
            onClick={() => handleIncreaseQuantity(newCart.id)}
          >
            <i className="bi bi-plus add-icon collect-item"></i>
          </button>
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 className="mb-0" style={{ fontSize: "1.2rem" }}>
            ${newCart.count * price || price}
          </h6>
        </div>
        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
          <button
            className="text-muted"
            style={{
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={() => handleRemoveCart(id)}
          >
            <i className="bi bi-x close-shop"></i>
          </button>
        </div>
        <div className=" mt-2">
          <hr />
        </div>
      </div>
    </>
  );
};

export default CartProductItem;
