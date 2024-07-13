import Image from 'next/image'
import React from 'react'
Image

const CategoryCard = () => {
  return (
    <div className='relative'>
        <div className='relative '>
            <Image src='/images/cat-Tv-Audio.webp' className='rounded-md shadow-sm border' alt={''} width={200} height={200}/>
        </div>
        <div className='flex absolute bottom-3 flex-col gap-1 text-center w-full'>
            <p className='font-bold text-lg text-center w-full'>T-shirts</p>
        </div>
    </div>
  )
}

export default CategoryCard
