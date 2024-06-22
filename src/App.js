import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewProductListing from "./Components/ProductDetailComponents/ProductListing";
import ProductDetail from "./Components/ProductDetailComponents/ProductDetail";
import GetAllCart from "./Components/CartComponents/GetAllCartDetail";
import { SkeletonTheme } from "react-loading-skeleton";
import Navbar from "./Components/Dashboard/Navbar";

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" />
      <SkeletonTheme>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<NewProductListing />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/getallcart" element={<GetAllCart />} />
            <Route> 404 Not Found </Route>
          </Routes>
        </Router>
      </SkeletonTheme>
    </div>
  );
}

export default App;
