"use client"
import { useAppSelector } from '@/lib/store/hooks'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{useEffect,useState} from 'react'
import toast from 'react-hot-toast'



const ProductOffCard = ({id}:any) => {
  const router = useRouter()
    const [productData, setProductData]: any = useState({});
    const [orderItems,setOrderItems]:any = useState([])
    const [shipAddress, setShipAddress]:any = useState({})
    const [fullPrice, setFullPrice]:any = useState(0)
    const isAdmin = useAppSelector((state)=>state.auth.user.isAdmin)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/user/order/orderDetails?orderId=${id}`);
        if(response.status == 200){
          if (response.data.data) {
            setProductData(response.data.data);
            setOrderItems(response.data.data.orderItems)
            setShipAddress(response.data.data.shippingAddress)          
          }
        }
      } catch (error:any) {
        if(error.response.status == 401){
          toast.error("No Order Found")
          router.push('/')
        }else{
          toast.error("Failed to fetch order details");
        }
      }
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
     if (orderItems.length > 0) {
      const fullprices = orderItems.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
      setFullPrice(fullprices);
    } else {
      setFullPrice(0);
    }
  }, [orderItems]);


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
            setProductData({
              ...productData,
              isProcessing:false
            });

        }
      } catch (error) {
        toast.error("Failed to Update Order");
        console.log(error);
      }

  }
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{productData._id}</h2>

    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
      <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
      {orderItems.map((item:any,index:number)=>(
  <div key={index} className="space-y-4 p-6">
  <div className="flex items-center gap-6">
    <Image src={item.product.imageUrl} width={100} height={100}  alt=''/>
   <div>
    <Link href={`/product/${item.product._id}`} className="min-w-0 flex-1 font-bold text-black hover:underline dark:text-white"> {item.product.description}</Link>
    <div className='flex flex-col mt-3'>
    <p className='text-xs text-gray-800'>Brand: {item.product.brand}</p>
    <p className='text-xs text-gray-800'>Category: {item.product.category}</p>
    </div>
    </div> 

  </div>

  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center justify-end gap-4">
      <p className="text-base font-normal text-gray-900 dark:text-white">Quantity : x{item.quantity}</p>

      <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">Rs.{item.product.priceDrop}</p>
    </div>
  </div>
</div>
        ))}
          



       

        <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="font-normal text-gray-500 dark:text-gray-400"> Total Original price</dt>
              <dd className="font-medium text-gray-900 dark:text-white">Rs.{fullPrice}</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="font-normal text-gray-500 dark:text-gray-400">Savings</dt>
              <dd className="text-base font-medium text-green-500">- Rs.{fullPrice- productData.totalPrice}</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="font-normal text-gray-500 dark:text-gray-400">Delivery</dt>
              <dd className="font-medium text-gray-900 dark:text-white">Free</dd>
            </dl>

          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
            <dd className="text-lg font-bold text-gray-900 dark:text-white"><span className='font-normal text-yellow-400 text-sm me-1'>({productData.isPaid? "Paid" : "unpaid"})</span> Rs. {productData.totalPrice}</dd>
          </dl>
        </div>
      </div>

      <div className="mt-6 grow sm:mt-8 lg:mt-0">
      <div className="space-y-6 rounded-lg border mb-5 border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
          <div
              className="w-full p-6 bg-gray-50  shadow-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <p className=" font-medium border-b py-2  text-black dark:text-gray-400">Name: {shipAddress.name}</p>
              <p className="font-medium border-b py-2 text-black dark:text-gray-400">Address: {shipAddress.address}</p>
              <p className="font-medium border-b py-2 text-black dark:text-gray-400">Country: {shipAddress.country}</p>
              <p className="font-medium border-b py-2 text-black dark:text-gray-400">City: {shipAddress.city}</p>
              <p className="font-medium  text-black py-2 dark:text-gray-400">Postalcode: {shipAddress.postalcode}</p>

            </div>
        </div>


        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

          <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Estimated delivery in 24 Nov 2023</h4>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                {productData.isProcessing?(<svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                </svg> ):(
                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>)}
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Order Processing</h4>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{productData.isProcessing? "In Progress" : "Completed"}</p>
            </li>

            <li className="ms-6 text-primary-700 dark:text-primary-500">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
              </span>
              <div>
                <h4 className="mb-0.5 font-semibold"> {formatDate(productData.paidAt)}</h4>
                <a href="#" className="text-sm font-medium hover:underline">Order placed</a>
              </div>
            </li>
          </ol>

          <div className="gap-4 sm:flex sm:items-center flex-wrap">
              {productData.isProcessing?(<button 
                  className="mt-3 text-white hover:text-green-700 border border-green-700 bg-green-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Cancel Order
                </button>) : null}
                <Link href={'/shop/'}><button
                  className="mt-3 text-white hover:text-green-700 border border-green-700 bg-black hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Go To Shop
                </button></Link>
                
                {isAdmin && productData.isProcessing?  <button onClick={()=>{updateOrder(productData._id)}}
                  className="mt-3 text-white hover:text-red-500 border border-red-500 bg-red-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Update Order
                </button>   
                : null}
                
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default ProductOffCard
