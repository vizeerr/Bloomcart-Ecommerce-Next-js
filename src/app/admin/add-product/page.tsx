import React from 'react'
import SideNavAdmin from '@/components/SideNavAdmin';
import ProductForm from '@/components/ProductForm';
const page = () => {
  return (
    <div className='flex justify-between'>
        <SideNavAdmin />
        <ProductForm/>

    </div>
  )
}

export default page
