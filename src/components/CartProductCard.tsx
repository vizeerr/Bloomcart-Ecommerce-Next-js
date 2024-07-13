
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { addToCart,removeFromCart} from '@/lib/store/features/cart/cartSlice';
import { useAppDispatch,useAppSelector } from '@/lib/store/hooks';



const CartProductCard = ({item,quantity}:any) => {
  const dispatch = useAppDispatch();
  const [loading,setLoading] = useState(false)
  const [quant,setquant] = useState(quantity)

  const addToCartItem = async (item: any) => {
    if(loading){
      toast.error("Quantity Updating..");
      return
    }
    setLoading(true); // Start loading
  
    try {
      const data = {
        productId: item._id
      };
      const response = await axios.post('/api/cart/addToCart', data);
  
      if (response.status === 200) {
        
        setquant(quant + 1); 
        const cartData = {
          ...item,
          quantity: 1
        };
        dispatch(addToCart(cartData)); 
        toast.success("Product Added");
      } else {
  
        toast.error("Product Not Added");
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  

  const subFromCart = async(item:any) =>{
    if(loading){
      toast.error("Quantity Updating..");
      return
    }
    setLoading(true); // Start loading
  
    try {
      const data = {
        productId:item._id
      }
      const response = await axios.post('/api/cart/subFromCart',data) 
        if(response.status == 200){
          setquant(quant-1)
        const cartData = {
          ...item,
          quantity: -1
        };
        dispatch(addToCart(cartData)); 
          toast.success("Product Removed")
        }else{
          toast.error("Product Not Removed")
        }
    } catch (error) {
      console.error('Error removing product to cart:', error);
      toast.error("Failed to remove product");
    } finally {
      setLoading(false);
    }
    
  } 
  const removeFromCartItem = async(item:any) =>{
    const data = {
      productId:item._id
    }
    const response = await axios.post('/api/cart/removeFromCart',data) 
      if(response.status == 200){
        setquant(0)
        const cartData = {
          _id:item._id
        };
        dispatch(removeFromCart(cartData)); 
        toast.success("Product Removed")
      }else{
        toast.error("Product Not Removed")
      }
  } 
  
  useEffect(()=>{
    setquant(quantity)
    
  },[quantity])
  
  return (
    <div className={quant>0?"w-full":"hidden"} >
       <div className="rounded-lg  border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center  md:gap-6 md:space-y-0">
              <Link href={`/product/${item._id}`} className="shrink-0 md:order-1">
                <Image priority={true} src={item.imageUrl} className='border shadow-sm' width={200} height={100} alt=''/>
              </Link>
              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 ">
                <Link href={`/product/${item._id}`} className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">{item.description}</Link>
               
                <div className="flex items-center ">
                 
                    
                  
                <div className="flex items-center">
                  <button onClick={()=>{subFromCart(item)}} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  {loading? (
                        <div role="status">
                          <svg aria-hidden="true" className="w-4 h-4 mx-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>    
                      </div>
                 
                    )
                  : (
                  <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" >{quant} </p>
                )}
                  <button onClick={()=>{addToCartItem(item)}}  type="button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-red-500 dark:text-white">Rs.{item.priceDrop}<span className='text-xs ms-2 text-gray-500 font-normal'>Rs.{item.price}</span> </p>
                </div>
                
              </div>
              <div className="">
                  <p className="text-xs  text-gray-600 dark:text-white">Brand: {item.brand}</p>
                  <p className="text-xs text-gray-600 dark:text-white">Category: {item.category}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-800 dark:text-white">You are saving <span className='text-green-400 font-bold'>{(item.price-item.priceDrop)/100}%</span> upon purchase</p>
                </div>
                <div className="flex items-center gap-4">
                  <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to Favorites
                  </button>

                  <button onClick={()=>removeFromCartItem(item)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
    
    </div>
  
  )
}

export default CartProductCard
