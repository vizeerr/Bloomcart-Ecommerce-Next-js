"use client"
import React from 'react'
import { useAppSelector,useAppDispatch } from '@/lib/store/hooks';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { processCheckout } from '@/lib/store/features/checkout/checkoutSlice';
import generateRandomId from '@/utils/generateRandomId'

const CartTotalCard = () => {
  const userCartTotal = useAppSelector((state) => state.cart.total);
  const userCartTotalItems = useAppSelector((state) => state.cart.totalItems);
  const userCartPrice = useAppSelector((state) => state.cart.priceTotal);
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleCheckout = () =>{
    const randomId:any = generateRandomId();
    dispatch(processCheckout(randomId))
    router.push('/checkout/')
  }


  
  return (
    <div className="   w-1/3 ">
        <div className="space-y-4 w-2/3 mx-auto rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div className="space-y-4 ">
            <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total Items</dt>
                <dd className="text-base font-medium text-black dark:text-white">{userCartTotalItems}</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total Price</dt>
                <dd className="text-base font-medium text-black">Rs.{userCartPrice}</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                <dd className="text-base font-medium text-red-500">- Rs.{(userCartPrice - userCartTotal)}</dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping Charge</dt>
                <dd className="text-base font-medium text-green-400 dark:text-white">Free</dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-xl font-bold text-gray-900 dark:text-white">Total Amount</dt>
              <dd className="text-xl font-bold text-gray-900 dark:text-white">Rs. {userCartTotal}</dd>
            </dl>
          </div>

          <button onClick={handleCheckout} className="w-full  text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Check Out</button>

        </div>
        <div className="w-2/3 mx-auto mt-8 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="voucher" className="mb-5 block text-base text-center font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
              <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Promocode" required />
            </div>
            <button  className="w-full  text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Apply Code</button>
            
          </div>
        </div>

    </div>
  )
}

export default CartTotalCard
