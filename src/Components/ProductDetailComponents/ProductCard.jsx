import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  addToCart,
  selectedItemsIds,
} from "../../Redux/Actions/ProductActions";
import SearchEmptyFound from "../Dashboard/EmptyCartPage";

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.allProducts.products);
  const existingProductIds = useSelector(
    (state) => state.productIds.selectedProductsIds
  );

  // handle product item add to cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    if (!existingProductIds.includes(product.id)) {
      toast.success("Item Added");
      dispatch(addToCart(product));
      dispatch(selectedItemsIds(product.id));
    }
  };

  // Redirect to all cart page
  const handleGoToCart = (e) => {
    e.preventDefault();
    navigate("/getallcart");
  };

  return (
    <div className="row">
      {products?.length > 0 ? (
        products?.map((product) => {
          const { id, title, price, image, category } = product;
          return (
            <div
              key={id}
              className="col-md-6 col-lg-4 my-4 d-flex justify-content-center "
            >
              <Link className="text-decoration-none" to={`/product/${id}`}>
                <div
                  className="card d-flex align-items-center new-img-card"
                  style={{ width: "20rem", height: "22rem" }}
                  key={id}
                >
                  <img
                    src={image}
                    className="card-img-top new-dress-img pt-2 "
                    alt="product"
                  />
                  <div className="card-body">
                    <p
                      className="card-title title-font"
                      data-toggle="tooltip"
                      data-placement="top"
                      title={title}
                    >
                      {title}
                    </p>
                    <h4> ${price}</h4>
                    <p className="d-flex justify-content-between">
                      <span>
                        <p className="card-text  px-2 new-category-detail card-category-font">
                          {category}
                        </p>
                      </span>
                      <span>
                        {existingProductIds.includes(id) ? (
                          <button
                            type="button"
                            className="btn btn-success rounded-5 border-0 text-white cart-font"
                            onClick={(e) => handleGoToCart(e)}
                          >
                            Go to cart
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn   btn-primary rounded-5 border-0 text-white cart-font"
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            Add to Cart +
                          </button>
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <SearchEmptyFound />
      )}
    </div>
  );
};

export default ProductCard;
