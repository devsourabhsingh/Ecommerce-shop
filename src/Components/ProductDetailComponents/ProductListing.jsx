import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import CardSkeleton from "../../Skeleton/CardSkeleton";
import ProductsComponent from "./ProductCard";
import { setProducts } from "../../Redux/Actions/ProductActions";

const ProductListing = () => {
  const skeletenArray = [1, 2, 3, 4, 5, 6];
  const [newLoading, setNewLoading] = useState(false);
  const dispatch = useDispatch();

  // Get all produts
  useEffect(() => {
    setNewLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setNewLoading(false);
        dispatch(setProducts(res.data));
      })
      .catch((error) => {
        toast.error("Error while fetching all product data");
      });
  }, [dispatch]);

  return (
    <>
      <div className="container">
        {newLoading ? (
          <div className="row">
            {skeletenArray.map((id) => {
              return (
                <>
                  <CardSkeleton key={id} />
                </>
              );
            })}
          </div>
        ) : (
          <ProductsComponent />
        )}
      </div>
    </>
  );
};

export default ProductListing;
