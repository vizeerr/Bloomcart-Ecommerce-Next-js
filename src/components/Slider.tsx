import React from 'react'
import { Carousel } from "flowbite-react";
import Image from 'next/image';
const Slider = () => {
  return (
    <div className="w-2/3">
    <Carousel>
      <Image width={1000} height={1000} src="/images/banner.jpg" alt="..." />
      <Image width={1000} height={1000} src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
      <Image width={1000} height={1000} src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
      <Image width={1000} height={1000} src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
      <Image width={1000} height={1000} src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />

    </Carousel>
  </div>
  )
}

export default Slider
