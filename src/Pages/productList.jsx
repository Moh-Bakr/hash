import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Layout/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const productList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/addproduct");
  };

  const handleMassDeleteClick = () => {
    let data = selectedProducts.join(",");
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/products/${data}`)
      .then((response) => {
        console.log(response.data);
        setProducts([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxChange = (event, productId) => {
    console.log(event.target.checked);
    if (event.target.checked === true) {
      setSelectedProducts([productId, ...selectedProducts]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productList]);

  return (
    <div className="flex flex-col items-start gap-20 ">
      <Nav title="Product List">
        <div className=" flex justify-end">
          <button
            onClick={handleAddClick}
            className="bg-primary-600 hover:bg-primary-700 mr-6 rounded-lg px-4 py-2 text-sm
             font-medium capitalize text-white outline-none ring-4 ring-blue-800 lg:px-5 lg:py-2.5
            "
          >
            Add
          </button>
          <button
            onClick={handleMassDeleteClick}
            className="bg-primary-600 hover:bg-primary-700 mr-2 rounded-lg px-4 py-2 text-sm
             font-medium capitalize text-white outline-none ring-4 ring-red-700 lg:px-5 lg:py-2.5
             "
          >
            Mass Delete
          </button>
        </div>
      </Nav>

      <div className="grid gap-20 p-3 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-[20px]  bg-white shadow-xl">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={(event) => handleCheckboxChange(event, product.id)}
                className="form-checkbox m-5 h-5 w-5  text-green-500"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <div className="font-bold text-gray-600"> {product.sku}</div>
              <div className="mb-2  font-bold">{product.name}</div>
              <div className="mb-2 font-bold text-gray-700">
                {product.type_name}
              </div>
              <div className="mt-4 text-xl font-bold">{product.price} $</div>

              <div className="mt-2 text-gray-600">
                {product.type_name === "DVD" && `Size: ${product.size} MB`}
                {product.type_name === "Book" && `Weight: ${product.weight} kg`}
                {product.type_name === "Furniture" &&
                  `Dimensions: ${product.width} x ${product.height} x ${product.length}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default productList;
