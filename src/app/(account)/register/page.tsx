/* eslint-disable react-hooks/rules-of-hooks */

"use client"
import React,{useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:'',
        });
    const [buttonDisabled, setButtonDisable] = useState(true)
    const [loading,setLoading] = useState(false)

    const onSignup = async ()=>{
        try {
            setLoading(true)
            if(formData.password == formData.cpassword){
                const user = {
                    name:formData.name,
                    email:formData.email,
                    password:formData.password,
                }
                const response = await axios.post("/api/register",user);
                console.log(response);
                
                if (response){
                    toast.success("Registiration Successfull")
                    router.push('/login')
                }

            }
        } catch (error) {
            console.log("register error: "+error);
            toast.error("Registiration failed")
        }
    }

    useEffect(()=>{
        if(formData.email.length > 0 && formData.password.length > 0 && formData.name.length>0 && formData.cpassword.length>0){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    },[formData])

  return (
    
    <div className="relative top-32 border p-8 max-w-sm m-auto rounded-2xl ">
        <div><Toaster position="bottom-center"
  reverseOrder={false}/></div>
      <h1 className="text-3xl text-black text-center ">Create An Account</h1>
      <div className="my-8">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"

          >
            Name
          </label>
          <input
            type="text"
            id="name"
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
        <div className="mb-5">
          <label
            htmlFor="cpassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="cpassword"
            id="cpassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formData.cpassword}
            onChange={(e)=>{
                setFormData({
                    ...formData,cpassword:e.target.value
                })
            }}
          />
        </div>

        <button
          
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onSignup}
        >
          Signup
        </button>
        <p className="text-base my-3">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default page;
