import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedProducts,
  addToCart,
  removeProducts,
  selectedItemsIds,
} from "../../Redux/Actions/ProductActions";
import SkeletonEffect from "../../Skeleton/SkeletonEffect";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const selectProduct = useSelector(
    (state) => state.singleProduct.selectedProduct
  );
  const getCartData = useSelector((state) => state.addCart.cartData);

  const { id, title, price, image, category, description } =
    selectProduct || {};
  const cartMatch = getCartData.find((item) => item.id === id);

  // Get product by id
  useEffect(() => {
    dispatch(removeProducts());
    setIsLoading(true);
    if (productId && productId !== "") {
      axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => {
          setIsLoading(false);
          dispatch(selectedProducts(res.data));
        })
        .catch((error) =>
          toast.error("Error while fetching product detail data")
        );
    }
  }, [productId, dispatch]);

  // handle product item add to cart
  const handleAddToCart = (id) => {
    toast.success("Item Added");
    dispatch(addToCart(selectProduct));
    dispatch(selectedItemsIds(id));
  };

  const handleGoToCart = () => {
    navigate("/getallcart");
  };

  return (
    <>
      <div className="row">
        <div className=" container">
          <div className=" mx-5">
            <Link to="/">
              <i className="bi bi-arrow-left-circle-fill"></i>
            </Link>
          </div>
          {isLoading ? (
            <SkeletonEffect />
          ) : (
            <div className=" container new-detail-shadow">
              <div className="card mb-3 single-product-card mt-2" key={id}>
                <div className="row g-0 mt-5">
                  <div className="col-md-4">
                    <img
                      src={image}
                      Name
                      className="img-fluid rounded-start new-detail-image p-5"
                      alt="product"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <span className=" d-flex gap-2 align-items-center">
                        <h5 className="">${price}</h5>
                        <i
                          className="bi bi-tag"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </span>
                      <div>
                        <div className=" mt-3  new-category-detail">
                          <p className="deatil-fashion-category">{category}</p>
                        </div>
                      </div>
                      <p className=" mt-3">{description}</p>
                    </div>
                    {!cartMatch ? (
                      <button
                        type="button"
                        className=" btn btn-primary btn-cart rounded-5 border-0 text-white mb-3"
                        onClick={() => handleAddToCart(id)}
                      >
                        Add to Cart +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success btn-cart rounded-5 border-0 text-white mb-3"
                        onClick={handleGoToCart}
                      >
                        Go to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
