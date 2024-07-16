"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
const OrderGrid = () => {

  const [productData, setProductData]: any = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      
        try {
          const response = await axios.get('/api/user/order/getAllOrder');
          if (response.data.data) {
            setProductData(response.data.data);
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

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      {productData.length > 0 ? (
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-3xl">My orders</h2>
            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className=" divide-gray-200 dark:divide-gray-700">
                {productData.map((item: any) => (
                  <div key={item._id} className="flex my-5 flex-wrap items-center gap-y-4 py-6 gap-x-5 bg-gray-50 border shadow-md p-5 rounded-lg">
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">#{item._id}</a>
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatDate(item.createdAt)}</dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">Rs.{item.totalPrice}</dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                      {
                        item.isProcessing?(<dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917L9.724 16.5 19 7.5" />
                            </svg>
                            Processing
                          </dd>):(<dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
                Cancelled
              </dd>)
                      }
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                    <Link href={`/orders/${item._id}`}> <button  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View Details</button>
                    </Link>
                    
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default OrderGrid;
