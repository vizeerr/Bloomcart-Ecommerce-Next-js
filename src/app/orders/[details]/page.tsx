import ProductOffCard from '@/components/ProductOffCard'
import React from 'react'

const page = ({params}:any) => {
  return (
    <div>
      <ProductOffCard id = {params.details}/>
    </div>
  )
}

export default page
