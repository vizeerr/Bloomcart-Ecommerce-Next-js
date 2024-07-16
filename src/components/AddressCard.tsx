"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { addShippingAddress } from "@/lib/store/features/address/addressSlice";

const AddressCard = () => {
  const orderId = useAppSelector((state) => state.checkout.checkout.id);
  const router = useRouter();

  // if (orderId === "") {
  //   toast.error("First Proceed To Checkout");
  //   router.push("/cart");
  // }

  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const stripePromise = loadStripe(
    "pk_test_51PcO1AHoZfz09jxKjhI8P1N7TYDIJcyj8wv50glBBZ6sanfMwyfFzflM3FFM5etySSLRnyDWjCOnT7HAVnl2hrRE002BZesJ7D"
  );
  const [addressData, setAddressData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalcode: "",
  });

  const callStripeSession = async (data:any) => {
    try {
      const response = await axios.post("/api/user/payment", data);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log("stripe error: " + error);
    }
  };

  const setAddress = async () => {
    if (
      formData.address &&
      formData.city &&
      formData.country &&
      formData.name &&
      formData.postalcode
    ) {
      try {
        const response = await axios.post("/api/user/address/addAddress", formData);
        if (response.status === 200) {
          setAddressData((prevAddresses):any => [...prevAddresses, formData]);
          toast.success("Shipping Address Added");
        }
      } catch (error) {
        toast.error("Error Adding Shipping Address");
      }
    } else {
      toast.error("Please Fill All Values");
    }
  };

  const chooseAddress = (item:any)=>{
    handleCheckout(item)
  }

  const handleCheckout = async (item:any) => {
    const stripe = await stripePromise;
    const createLineItem = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          images: [item.imageUrl],
          name: item.name,
        },
        unit_amount: item.priceDrop * 100,
      },
      quantity: item.quantity,
    }));

    const data = {
      lineItem: createLineItem,
      shippingAddress:item,
    };
    const response = await callStripeSession(data);
    if (response) {
      const { error }:any = await stripe?.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (error) {
        toast.error("Error In Checkout");
      }
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get("/api/user/address/getAddress");
        if (response.status === 200) {
          const address = response.data.data.flatMap((user:any) => user.shippingAddress);
          setAddressData(address);
        }
      } catch (error) {
        toast.error("Error Showing Shipping Address");
      }
    };
    getAddress();
  }, []);

  return (
    <div className="flex justify-center gap-10 p-8 my-8">
      {addressData.length > 0 ? (
        <div className="w-1/3">
          {addressData.map((item:any, index) => (
            <div
              key={index}
              className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <p className="font-semibold text-gray-800 dark:text-gray-400">Name: {item.name}</p>
              <p className="font-semibold text-gray-800 dark:text-gray-400">Address: {item.address}</p>
              <p className="font-semibold text-gray-800 dark:text-gray-400">Country: {item.country}</p>
              <p className="font-semibold text-gray-800 dark:text-gray-400">City: {item.city}</p>
              <p className="font-semibold text-gray-800 dark:text-gray-400">Postalcode: {item.postalcode}</p>

              <div className="flex">
                <button onClick={()=>{chooseAddress(item)}}
                  className="mt-3 text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Choose Address
                </button>
                <button
                  className="mt-3 text-white hover:text-green-700 border border-green-700 bg-black hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Update Address
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
        <div className="w-1/3 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 text-center dark:text-white">
            Shipping Address
          </p>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              type="text"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <input
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              type="text"
              id="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="postalcode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Postal Code
            </label>
            <input
              value={formData.postalcode}
              onChange={(e) => setFormData({ ...formData, postalcode: e.target.value })}
              type="number"
              id="postalcode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            onClick={setAddress}
            className="w-full text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Add Address
          </button>
        </div>
      
    </div>
  );
};

export default AddressCard;
