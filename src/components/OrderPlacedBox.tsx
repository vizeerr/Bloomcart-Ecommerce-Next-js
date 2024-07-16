  "use client"
  import React, { useEffect,useRef} from 'react'
  import { useAppSelector,useAppDispatch } from "@/lib/store/hooks";
  import axios from "axios";
  import toast from "react-hot-toast";
  import Link from 'next/link';
  import { clearCart } from '@/lib/store/features/cart/cartSlice';
  import { processCheckout } from '@/lib/store/features/checkout/checkoutSlice';
  import { useRouter } from 'next/navigation';


  const OrderPlacedBox = ({status,id}:any) => {
      const router = useRouter()
      const dispatch = useAppDispatch()
      const isProcessingRef = useRef(false);
      useEffect(() => {
        const proceedOrder = async () => {
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;
            try {
                const data = {sessionId: id,};
                const response = await axios.post('/api/user/order/verifyOrder', data);
                if (response.status === 200) {
                  console.log(response);
                  
                    toast.success("Order Placed Successfully");
                    dispatch(clearCart())
                    dispatch(processCheckout(''))
                } else if (response.status === 401) {
                    toast.error("Order Not Proceeded. Payment will be refunded soon.");
                }
            } catch (error) {
                toast.error("Order Error");
                console.log(error);
            } finally {
              isProcessingRef.current = false; // Reset the processing state
          }
        };

        if (status === "success" && id) {
            proceedOrder();
        } else if (status !== "success") {
            router.push('/checkout/error/');
        }else if(status === "error"){
          toast.error("Order Not Proceeded. Payment Failed");
        }
    }, []);
    
    return (
      <div className=' my-10 w-full'>
        {status == "success" ? (
          
      <div className="shadow-md flex flex-col mx-auto  items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex flex-col justify-between p-4 leading-norma w-full text-center">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Your Order is Placed Successfully</h5>
          <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">Payment Successfull</p>
          <button
            className="mt-3 text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            View Order
          </button>
      </div>
      </div>

          ) :(
              <div className="shadow-md flex flex-col mx-auto  items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex flex-col justify-between p-4 leading-norma w-full text-center">
                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order Payment Unsuccessfull</h5>
                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">Your Order is not Placed</p>
                
                <Link href={'/cart/'}><button
                  className="mt-3 text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Back to Cart
                </button></Link>
            </div>
            </div>
          )}
      </div>
    )
  }

  export default OrderPlacedBox
