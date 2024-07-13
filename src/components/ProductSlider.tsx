import React from 'react'
import ProductCard from '@/components/ProductCard'
const ProductSlider = () => {
  return (
    <div>
        <div className='flex justify-between p-10'>
            <h1 className='text-4xl'> Best Selling Products</h1>
            <button className='border px-3 py-1'>View All</button>
        </div>
        <div className='flex justify-evenly'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>

    </div>

  )
}

export default ProductSlider
