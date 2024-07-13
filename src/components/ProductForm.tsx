"use client";
import React, { useState } from "react";
import { firebaseConfig } from "@/utils/fireBaseConfig";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.FIREBASE_STORAGE);


const uploadImage = async (file: any) => {
  const getfileName = file.name;
  const storageRef = ref(storage, `bloomcart/${getfileName}`);
  const uploadImage = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapsot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
};

const ProductForm = () => {
    const [imageFile,setImageFile] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    onSale: "",
    priceDrop: "",
    colors: "",
    imageUrl: "",
    inventory: "",
    category: "",
  });

  const handleImage = async (e: any) => {

    const extImageUrl: any = await uploadImage(e.target.files[0]);
    if(extImageUrl !== ''){
        setFormData({
            ...formData,
            imageUrl: extImageUrl
          });
    }
  };


  const addProductItem = async() =>{
    try {
        console.log(formData);
        const response = await axios.post('/api/admin/addProduct',formData)
        if (response.status == 200) {
            toast.success('Product Added Successfully')
        }else{
            toast.error('Product failed')
        }
    } catch (error:any) {
        console.log(error);
        
    }
        
  }
  return (
    <div className="w-full m-8 p-10 bg-white rounded-xl shadow-lg gap-8 flex flex-col">
      <h1 className="text-3xl text-center my-5">Add a New Product</h1>
      <div>
        <label
          htmlFor="Name"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Product Name
        </label>
        <input
          type="text"
          id="Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.name}
            onChange={(e)=>{
                setFormData({
                    ...formData,name:e.target.value
                })
            }}
        />
      </div>
      <div>
        <label
          htmlFor="Desc"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Product Description
        </label>
        <input
          type="text"
          id="Desc"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.description}
            onChange={(e)=>{
                setFormData({
                    ...formData,description:e.target.value
                })
            }}
        />
      </div>
      <div>
        <label
          htmlFor="Brand"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Product Brand
        </label>
        <input
          type="text"
          id="Brand"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.brand}
            onChange={(e)=>{
                setFormData({
                    ...formData,brand:e.target.value
                })
            }}
        />
      </div>

      <div>
        <label
          htmlFor="Price"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Product Price
        </label>
        <input
          type="text"
          id="Price"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.price}
            onChange={(e)=>{
                setFormData({
                    ...formData,price:e.target.value
                })
            }}
        />
      </div>
      <div>
        <label
          htmlFor="offPrice"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Product Off Price
        </label>
        <input
          type="text"
          id="offPrice"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.priceDrop}
            onChange={(e)=>{
                setFormData({
                    ...formData,priceDrop:e.target.value
                })
            }}
        />
      </div>
      <div>
        <label
          htmlFor="Invent"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Product Inventory
        </label>
        <input
          type="text"
          id="Invent"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.inventory}
            onChange={(e)=>{
                setFormData({
                    ...formData,inventory:e.target.value
                })
            }}
        />
      </div>
      <div>
        <label
          htmlFor="Colors"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Product Colors (Seprated by coma ,)
        </label>
        <input
          type="text"
          id="Colors"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.colors}
            onChange={(e)=>{
                setFormData({
                    ...formData,colors:e.target.value
                })
            }}
        />
      </div>
      <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose Category
        </label>
        <select
        required
        value={formData.category}
        onChange={(e)=>{
            setFormData({
                ...formData,category:e.target.value
            })
        }}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue = "none">None</option>
          <option value="Smart Watches">Smart Watches</option>
          <option value="TV & Audio">TV & Audio</option>
          <option value="Headphones & Speakers">Headphones & Speakers</option>
          <option value="Cameras & Photos">Cameras & Photos</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Product On Sale
        </label>
        <select
        
            value={formData.onSale}
            onChange={(e)=>{
                setFormData({
                    ...formData,onSale:e.target.value
                })
            }}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue = "false" value="false">
            No
          </option>
          <option value="true">yes</option>
        </select>
      </div>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Product Image
        </label>
        <input
          onChange={handleImage}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
      </div>
      <div>
        <button
        onClick={addProductItem}
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 shadow-lg"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
