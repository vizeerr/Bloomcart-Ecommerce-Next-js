"use client"
import axios from 'axios';

import React,{ useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const OrdersTable = () => {

    const [productData, setProductData]: any = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      
        try {
          const response = await axios.get('/api/admin/orders/getAllOrders');
          if (response.data.data) {
            setProductData(response.data.data);
            console.log(response.data.data);
            
          }
        } catch (error) {
          toast.error("Failed to fetch orders");
          console.log(error);
        }
      
    };

    fetchProducts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const updateOrder = async(id:string) =>{
    const data = {
        _id:id,
    }
    try {
        const response = await axios.put('/api/admin/orders/updateOrder',data);
        if (response.status == 200) {
            toast.success('Order Updated')

            setProductData(productData.map((order:any) => 
                order._id === id ? { ...order, isProcessing: false } : order
            ));

        }
      } catch (error) {
        toast.error("Failed to Update Order");
        console.log(error);
      }

  }

  return (
    <div className="relative w-full m-8 px-2 py-5 bg-white rounded-xl shadow-lg overflow-x-auto  sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">
                     Sno.
                </th>
                <th scope="col" className="px-4 py-3">
                    Customer Name
                </th>
                <th scope="col" className="px-4 py-3">
                   Order Id
                </th>
               
                <th scope="col" className="px-4 py-3">
                    Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                   Order Processing
                </th>
                <th scope="col" className="px-4 py-3">
                   Date
                </th>
                <th scope="col" className="px-4 py-3">
                   Total Price
                </th>
                <th scope="col" className="px-4 py-3">
                   Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {
                productData ?
                productData.map((item:any,index:any) => (
                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                
                    <td className="px-4 py-4">
                        {index+1}.
                    </td>
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900  dark:text-white">
                        {item.shippingAddress.name}
                    </th>
                    <td className="px-4 py-4">
                    #{item._id}
                    </td>
                    
                    <td className="px-4 py-4">
                        <p className=' bg-green-100 py-1 text-center rounded-full mx-auto'>

                    {item.isPaid ? "Paid" : "Unpaid"}
                        </p>
                    </td>
                    
                    <td className="px-4 py-4">
                        <p className=' bg-blue-100 py-1 text-center rounded-full mx-auto'>
                          {item.isProcessing? "Processing" : "Completed" }
                        </p>
                    </td>
                    
                    <td className="px-4 py-4">
                    {formatDate(item.paidAt)}
                    </td>
                    <td className="px-4 py-4 text-red-600">
                    Rs.{item.totalPrice}
                    </td>
                    
                    <td className="px-4 py-4 flex gap-2 flex-col text-center">

                    <button onClick={()=>{updateOrder(item._id)}}
                  className=" text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  py-1.5 px-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Update
                </button>
                <Link href= {`/orders/${item._id}`}>
                <button
                  className=" w-full text-white hover:text-green-700 border border-green-700 bg-black hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm py-1.5 px-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  View
                </button>
                  </Link>
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

export default OrdersTable
