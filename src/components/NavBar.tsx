"use client"
import React, { Fragment, useEffect ,useState} from 'react'
import Image from 'next/image'
import { CiShoppingCart,CiHeart,CiUser,CiSearch  } from "react-icons/ci";
import Link from 'next/link';
import { useAppDispatch,useAppSelector } from '@/lib/store/hooks';
import { setAuth,delAuth } from '@/lib/store/features/profile/profileSlice';
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
import { addToCart,clearCart } from '@/lib/store/features/cart/cartSlice';

const NavBar = () => {
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userData = useAppSelector((state) => state.auth.user);
  
  const userCartItem =  useAppSelector((state) => state.cart.totalItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/cart/getCartProducts'); 
        if (response.data.data){
          const cartData = response.data.data
          
          dispatch(clearCart())

          cartData.map((item:any)=>{
            const reduxCartData = ({
              ...item.productId,
              quantity:item.quantity
            })
            console.log(reduxCartData);
            
            dispatch(addToCart(reduxCartData))
            
          })
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch])
  
  useEffect(() => {
    if (userData.email !== '') {
      setIsAuthUser(true);
      setIsAdmin(userData.isAdmin);
    }
  }, [userData]);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        console.log(response.data.data);
        
        if (response.status === 200) {
          setIsAuthUser(true);
          dispatch(setAuth(response.data.data));
          setIsAdmin(response.data.data.isAdmin);
        } else {
          setIsAuthUser(false);
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAuthUser(false);
        setIsAdmin(false);
      }
    };

    getAuth();
  }, [dispatch]);

  
  const logoutUser= async() =>{
    try {
      const response = await axios.get('/api/logout'); // Adjust the URL to your actual API endpoint
      if(response.status==200){
        dispatch(delAuth())
        setIsAuthUser(false);
        setIsAdmin(false)
        toast.success("Logout Successfully")
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  return (

    <header className='sticky top-0 z-20'>
    <div><Toaster position="bottom-center"
  reverseOrder={false}/></div>
      <nav className="bg-white  dark:bg-gray-900 w-full z-20 top-0  start-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bloomcart</span>
        </a>
        <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        
        </button>
        <div className="hidden md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <Link href={"/"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Home
          </Link>
          <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
       
            <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li aria-labelledby="dropdownNavbarLink">
                    <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                    </button>
                    <div id="doubleDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Overview</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My downloads</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Billing</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Rewards</a>
                          </li>
                        </ul>
                    </div>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                </ul>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </div>
            </div>
          </li>
          <Link href={"/shop"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Shop
          </Link>
        
      </ul>
    </div>

    <div className='flex justify-evenly gap-5 flex-wrap items-center'>

          <Link href={'/cart'} className='relative'>
            <CiShoppingCart size={"20px"} />
            <p className='bg-yellow-200 px-2 -top-3 -right-3 absolute text-sm rounded-full m-0'>{userCartItem}</p>
          </Link>
          <CiHeart size={"20px"} />

          {isAuthUser?(
            <CiUser size={"20px"}/>):null
          }
          

          <form className="flex items-center max-w-sm mx-auto">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
    </div>
    <button type="submit" className="p-2.5 ms-2 text-sm font-medium ">
    <CiSearch size={"20px"} className=''/>
    </button>
</form>
{isAdmin ? (
  <Link href="/admin">
  <button
    type="button"
    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
    Admin
  </button>
</Link>
):null}

{
  isAuthUser ? (
    // If user is authenticated, show logout text and link
    <>
    
      <button
        onClick={logoutUser}
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Logout
      </button>
    
    </>
  ) : (
    <>
    <Link href="/login">
      <button
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
        Login
      </button>
    </Link>
        </>
  )
}

          
        </div>
  </div>
</nav>

    
      </header>
  )
}

export default NavBar
