import { useState } from "react";
import axios from "axios";
import Nav from "../components/Layout/Navbar.jsx";
import InputField from "../components/Inputs/InputField.jsx";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  let typeCode = {
    dvd: "1",
    book: "2",
    furniture: "3",
  };
  const baseUrl = `${import.meta.env.VITE_API_URL}/api/products`;
  const [productType, setProductType] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [productFields, setProductFields] = useState({
    sku: "",
    name: "",
    price: "",
    width: "",
    height: "",
    length: "",
    weight: "",
    size: "",
  });

  const handleProductTypeChange = (event) => {
    const selectedType = event.target.value;
    setProductType(selectedType);
    setProductFields({
      sku: "",
      name: "",
      price: "",
      width: "",
      height: "",
      length: "",
      weight: "",
      size: "",
    });
    setErrors({});
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProductFields({ ...productFields, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSave = () => {
    const validationErrors = {};
    const requiredFields = ["sku", "name", "price"];
    const numericFields = {
      price: true,
      width: true,
      height: true,
      length: true,
      weight: true,
      size: true,
    };

    requiredFields.forEach((field) => {
      if (!productFields[field]) {
        validationErrors[field] = `${field} is required`;
      }
    });

    Object.entries(productFields).forEach(([key, value]) => {
      if (numericFields[key] && isNaN(value)) {
        validationErrors[key] = `${key} must be a number`;
      }
    });

    if (productType === "furniture") {
      ["width", "height", "length"].forEach((field) => {
        if (!productFields[field]) {
          validationErrors[field] = `${field} is required`;
        }
      });
    } else if (productType === "book") {
      if (!productFields.weight) {
        validationErrors.weight = "weight is required";
      }
    } else if (productType === "dvd") {
      if (!productFields.size) {
        validationErrors.size = "size is required";
      }
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(baseUrl, {
          type_id: typeCode[productType],
          ...productFields,
        })
        .then((response) => {
          // do something with successful response
        })
        .catch((error) => {
          // handle error
        });
      console.log(productFields);
    }
  };
  const cancleHandler = () => {
    setProductType("");
    setProductFields({
      sku: "",
      name: "",
      price: "",
      width: "",
      height: "",
      length: "",
      weight: "",
      size: "",
    });
    setErrors({});
    navigate("/");
  };

  return (
    <div>
      <Nav title="Add Product">
        <div>
          <button
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 mr-6 rounded-lg px-4 py-2 text-sm
             font-medium capitalize text-white outline-none ring-4 ring-green-800 lg:px-5 lg:py-2.5"
          >
            Save
          </button>
          <button
            onClick={cancleHandler}
            className="bg-primary-600 hover:bg-primary-700 mr-2 rounded-lg px-4 py-2 text-sm
             font-medium capitalize text-white outline-none ring-4 ring-red-700 lg:px-5 lg:py-2.5"
          >
            Cancel
          </button>
        </div>
      </Nav>

      <form className="mt-4 p-10">
        <InputField
          label="Sku"
          labelError="sku"
          handleFieldChange={handleFieldChange}
          errors={errors}
        />
        <InputField
          label="Name"
          labelError="name"
          handleFieldChange={handleFieldChange}
          errors={errors}
        />
        <InputField
          label="Price"
          labelError="price"
          handleFieldChange={handleFieldChange}
          errors={errors}
        />
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="productType">
            Product Type:
          </label>
          <select
            id="productType"
            className="focus:shadow-outline block  rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none"
            value={productType}
            onChange={handleProductTypeChange}
          >
            <option value="">Select a product type</option>
            <option value="furniture">Furniture</option>
            <option value="book">Book</option>
            <option value="dvd">DVD</option>
          </select>
        </div>
        {productType === "furniture" && (
          <>
            <InputField
              label="Width"
              labelError="width"
              handleFieldChange={handleFieldChange}
              errors={errors}
            />
            <InputField
              label="Height"
              labelError="height"
              handleFieldChange={handleFieldChange}
              errors={errors}
            />
            <InputField
              label="Length"
              labelError="length"
              handleFieldChange={handleFieldChange}
              errors={errors}
            />
          </>
        )}
        {productType === "book" && (
          <div className="mb-4">
            <InputField
              label="Weight"
              labelError="weight"
              handleFieldChange={handleFieldChange}
              errors={errors}
            />
          </div>
        )}
        {productType === "dvd" && (
          <div className="mb-4">
            <InputField
              label="Size"
              labelError="size"
              handleFieldChange={handleFieldChange}
              errors={errors}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
