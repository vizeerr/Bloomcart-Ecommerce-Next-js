import React from 'react'
import CategoryCard from '@/components/CategoryCard'
const CategorySlider = () => {
  return (
    <div>
        <div className='flex justify-between p-10'>
            <h1 className='text-4xl'>  Browse By Category</h1>
            <button className='border px-3 py-1'>View All</button>
        </div>
        <div className='flex justify-evenly'>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />

        </div>

    </div>

  )
}

export default CategorySlider
