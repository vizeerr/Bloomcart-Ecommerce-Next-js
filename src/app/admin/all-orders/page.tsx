import React from 'react'
import SideNavAdmin from '@/components/SideNavAdmin';
import OrdersTable from '@/components/OrdersTable';
const page = () => {
    
  return (
    <div className='flex justify-between'>
        <SideNavAdmin />
        <OrdersTable/>
    </div>
  )
}

export default page
