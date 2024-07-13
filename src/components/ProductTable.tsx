"use client"
import axios from 'axios';
import Image from 'next/image';
import React,{ useEffect, useState } from 'react';
import Link from 'next/link';
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline,MdOutlineModeEditOutline } from "react-icons/md";
const ProductTable = () => {

    const [productData, setProductData] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const response = await axios.get('/api/allProducts') 
        if(response.data.data){
          setProductData(response.data.data)
        }
      };
  
      fetchProducts();
    }, []);


  return (

        

<div className="relative w-full m-8 px-2 py-5 bg-white rounded-xl shadow-lg overflow-x-auto  sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">
                     Sno.
                </th>
                <th scope="col" className="px-4 py-3">
                     Image
                </th>
                <th scope="col" className="px-4 py-3">
                     Name
                </th>
                <th scope="col" className="px-4 py-3">
                    Description
                </th>
                <th scope="col" className="px-4 py-3">
                    Price
                </th>
                <th scope="col" className="px-4 py-3">
                    Off Price
                </th>
                <th scope="col" className="px-4 py-3">
                    Category
                </th>
                <th scope="col" className="px-4 py-3">
                   Sale
                </th>
                <th scope="col" className="px-4 py-3">
                   Inventory
                </th>
                <th scope="col" className="px-4 py-3">
                   Colors
                </th>
                <th scope="col" className="px-4 py-3">
                   Brand
                </th>
                <th scope="col" className="px-4 py-3">
                   Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {
                productData && productData.length ? 
                productData.map((item:any,index) => (
                    <tr key={index+1} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                
                    <td className="px-4 py-4">
                        {index+1}.
                    </td>
                    <td className="px-4 py-4">
                        <Image src={item.imageUrl} alt="" width ={100} height={400} />
                    </td>
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900  dark:text-white">
                        {item.name}
                    </th>
                    <td className="px-4 py-4">
                        {item.description.slice(0,40)}...
                    </td>
                    <td className="px-4 py-4">
                        Rs.{item.price}
                    </td>
                    <td className="px-4 py-4">
                        Rs.{item.priceDrop}
                    </td>
                    <td className="px-4 py-4">
                        {item.category}
                    </td>
                    <td className="px-4 py-4">
                    {item.onSale ? "On Sale" : "Off Sale"}
                    </td>
                    <td className="px-4 py-4">
                    {item.inventory}
                    </td>
                    <td className="px-4 py-4">
                    {item.colors}
                    </td>
                    <td className="px-4 py-4">
                    {item.brand}
                    </td>
                    <td className="px-4 py-4 flex gap-2 flex-col text-center">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex gap-2  items-center " href='/'> <IoEyeOutline className='text-blue-700' width={"25px"}/> View</Link>
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex gap-2  items-center" href='/'> <MdOutlineModeEditOutline  className='text-green-500' width={"25px"}/> Edit</Link>
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex gap-2  items-center" href='/'> <MdDeleteOutline className='text-red-500' width={"25px"} />Delete</Link>
                        
                        
                    </td>
                </tr>
                ))
              : null
            }
           
            
        </tbody>
    </table>
</div>

      
  )
}

export default ProductTable
