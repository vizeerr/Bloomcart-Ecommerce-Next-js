"use client"
import React,{ useEffect, useState } from 'react';
import CartProductCard  from "@/components/CartProductCard"
import axios from 'axios';
import toast from 'react-hot-toast';

const CartProductGrid = () => {

    const [productData, setProductData] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const response = await axios.get('/api/cart/getCartProducts'); 
        if(response.data.data){
          setProductData(response.data.data)
          console.log(response.data.data); 
        }
      };
    
      fetchProducts();
    }, []);
    
  return (
    
    <div className='w-3/5 flex flex-col gap-10'>
        {productData && productData.length ? 
            productData.map((item:any,index) => (
                <CartProductCard key={index} quantity={item.quantity} item={item.productId} />
            ))
          : null}
     
    </div>
  )
}

export default CartProductGrid
