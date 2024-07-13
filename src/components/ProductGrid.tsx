"use client"
import ProductCard from '@/components/ProductCard';
import React,{ useEffect, useState } from 'react';

import axios from 'axios';

const ProductGrid = () => {
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
    <div className='w-full'>
        <h1 className='text-4xl text-center my-10'>Products Collection</h1>
        <div className='flex justify-evenly'>
          {productData && productData.length ? 
            productData.map((item,index) => (
              <ProductCard key={index} item={item} />
            ))
          : null}
        </div>
      </div>
  )
}

export default ProductGrid
