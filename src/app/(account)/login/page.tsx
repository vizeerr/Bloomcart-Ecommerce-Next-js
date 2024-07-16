/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuth } from "@/lib/store/features/profile/profileSlice";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const dipatch = useAppDispatch()

  const onlogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", formData);
      if (response) {
        toast.success("Login Successfull");
        console.log(response.data.data);
        
        dipatch(setAuth(response.data.data))
        router.push("/");
      }
    } catch (error) {
      console.log("login error: " + error);
      toast.error("login failed");
    }
  };

  return (
    <div className="relative top-40 border p-8 max-w-sm m-auto rounded-2xl ">
      
      <h1 className="text-3xl text-black text-center ">Login Here</h1>
      <div className="my-8">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            value={formData.email}
            onChange={(e)=>{
                setFormData({
                    ...formData,email:e.target.value
                })
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formData.password}
            onChange={(e)=>{
                setFormData({
                    ...formData,password:e.target.value
                })
            }}
          />
        </div>

        <button
        onClick={onlogin}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <p className="text-base my-3">
          Does not have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default page;
