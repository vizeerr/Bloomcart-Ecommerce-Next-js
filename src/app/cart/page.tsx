import React from 'react'

import CartProductGrid from '@/components/CartProductGrid'
import CartTotalCard from '@/components/CartTotalCard'

const page = () => {
  return (
    <div className='flex m-10 justify-evenly'>
      
      <CartProductGrid/>
      <CartTotalCard/>

    </div>
  )
}

export default page
