import React from 'react'
import Link from 'next/link'
import { BsArrowRight } from "react-icons/bs";

const SideNav = () => {
  return (
    <div className='flex flex-col p-10 text-base w-1/6 bg-gray-100  my-5'>
        <ul className='flex flex-col gap-5'>
          <li className='border-b-2 py-3 border-solid border-gray-300'> <Link href={"/"} className='flex text-lg flex-wrap  items-center justify-between'>Home <BsArrowRight /></Link> </li>
          <li className='border-b-2 py-3 border-solid border-gray-300'> <Link href={"/"} className='flex text-lg flex-wrap  items-center justify-between'>Home <BsArrowRight /></Link> </li>
          <li className='border-b-2 py-3 border-solid border-gray-300'> <Link href={"/"} className='flex text-lg flex-wrap  items-center justify-between'>Home <BsArrowRight /></Link> </li>
          <li className='border-b-2 py-3 border-solid border-gray-300'> <Link href={"/"} className='flex text-lg flex-wrap  items-center justify-between'>Home <BsArrowRight /></Link> </li>
          <li className='border-b-2 py-3 border-solid border-gray-300'> <Link href={"/"} className='flex text-lg flex-wrap  items-center justify-between'>Home <BsArrowRight /></Link> </li>
        
        </ul>
    </div>
  )
}

export default SideNav
