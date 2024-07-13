import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import { CiShoppingCart} from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { MdStar } from "react-icons/md";
import { useAppDispatch,useAppSelector } from '@/lib/store/hooks';
import { MdDeleteOutline,MdOutlineModeEditOutline } from "react-icons/md";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { addToCart } from '@/lib/store/features/cart/cartSlice';

const ProductCard = ({item}:any) => {
  const userData = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userData.email !== '') {
      setIsAdmin(userData.isAdmin);
    }
  }, [userData]);

  const addToCartItem = async(item:any) =>{
    const data = {
      productId:item._id
    }
    const response = await axios.post('/api/cart/addToCart',data) 
      if(response.status == 200){
        const cartData:any = ({
      ...item,
      quantity:1
    }) 

    dispatch(addToCart(cartData));
    toast.success("Product Added")
      }else{
        toast.error("Product Not Added")
      }

    

  } 
  return (
    
    <div className='p-5 rounded-lg '>
      <Link href={`/product/${item._id}`}>
        <div className='relative'>
            <Image priority={true}  src={item.imageUrl} className='border rounded-lg shadow-sm' alt={''} width={250} height={200}/>
            <FiHeart className='absolute  top-0 m-3 drop-shadow-md text-pink-500 'size={"25px"}/>
            {isAdmin? (
              <><MdOutlineModeEditOutline className='absolute  top-20 m-3 drop-shadow-md text-black ' size={"25px"} /><MdDeleteOutline className='absolute  top-10 m-3 drop-shadow-md text-red-600 ' size={"25px"} /></>
            ):null}
            {
              item.onSale ? 
              <div className="rounded-full px-4 opacity-80 shadow-sm backdrop-blur-sm top-0 right-0 m-3 py-1 absolute bg-yellow-200 text-black">
              Sale
            </div>:null
            }
            
        </div></Link>
        <div className='flex flex-col gap-1 p-3'><Link href={`/product/${item._id}`}>
            <p className='font-bold text-2xl'>{item.name.slice(0, 20)}</p>
            <p className='text-sm'>{item.description.slice(0, 35)}</p>
            <p className='font-bold flex gap-2 items-center text-lg text-red-600'>Rs. {item.priceDrop} <span className='font-normal text-xs text-zinc-800 '>Rs.{item.price}</span></p>
            </Link>
            <div className='flex'>
                <MdStar size={'16px'} className='text-yellow-400'/> 
                <MdStar size={'16px'} className='text-yellow-400'/> 
                <MdStar size={'16px'} className='text-yellow-400'/> 
                <MdStar size={'16px'} className='text-yellow-400'/> 
                <MdStar size={'16px'} className='text-yellow-400'/> 
                <p className='text-xs text-gray-600'>({item.reviews})</p>
            </div>
            <button onClick={()=>{addToCartItem(item)}} className='w-full  py-2 mt-3 bg-gray-100 border rounded-full flex items-center justify-center gap-2'> Add To Cart <CiShoppingCart width={"40px"}/></button>
            {/* <div className='flex'>
            <button className='w-full p-3 mt-3 bg-gray-200'>Buy Now</button>

            </div> */}
        </div>
    </div>
   
  )
}

export default ProductCard
