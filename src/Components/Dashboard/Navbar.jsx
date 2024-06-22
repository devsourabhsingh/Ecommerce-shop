import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Category from "./Category";
import { setProducts } from "../../Redux/Actions/ProductActions";
import newFashion from "../../Image/digilogo.png";

const Navbar = () => {
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const products = useSelector((state) => state.allProducts.products);

  const [deviceTypeWidth, setdeviceTypeWidth] = useState("");

  useEffect(() => {
    if (searchItem.length > 3) {
      delaySearch();
    }
    if (searchItem === "") {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          dispatch(setProducts(res.data));
        })
        .catch((error) => {
          toast.error("Error while fetching all product data");
        });
    }
  }, [searchItem]);

  useEffect(() => {
    const newData = "All";
    handleResize();
    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        setCategoryData([...res.data, newData].sort());
      })
      .catch((error) =>
        toast.error("Error while fetching product categories data")
      );
    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // get window width detail for responsiveness
  const handleResize = () => {
    const width = window.innerWidth;
    setdeviceTypeWidth(width);
  };

  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };

  // search product categories debouce functionality implmentation
  const delaySearch = () => {
    const newSearch = products?.filter((product) =>
      product?.title?.toLowerCase().includes(searchItem?.toLowerCase())
    );
    dispatch(setProducts(newSearch));
  };

  return (
    <>
      <div className=" container">
        <div className="new-nav-shadow">
          <nav className="navbar navbar-head">
            <div className="three-grid">
              <div>
                <Link to="/">
                  <img className="new-fashion" src={newFashion} alt="product" />
                </Link>
              </div>
              <div>
                <form className="d-flex" role="search">
                  <div class="input-group mt-2 mb-2">
                    <input
                      type="text"
                      className="search-bar"
                      value={searchItem}
                      onChange={handleChange}
                      placeholder=" Search here..."
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                    <button className=" new-btn-search">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <Category
                  deviceTypeWidth={deviceTypeWidth}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
