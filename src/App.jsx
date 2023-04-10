import React from "react";
import ProductList from "./Pages/productList.jsx";
import AddProduct from "./Pages/addProduct.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
