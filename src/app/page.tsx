"use client"
import React,{useEffect,useState} from "react";
import Image from "next/image";
import SideNav from "@/components/SideNav";
import ProductSlider from "@/components/ProductSlider";
import CategorySlider from "@/components/CategorySlider";
import Slider from "@/components/Slider";
import axios from "axios";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center gap-5 mt-10">
        <SideNav/>
        <Slider/>
      </div>
      {/* <ProductSlider/> */}
      <div className="flex justify-center my-10">
        <Image src="/images/midbanner.png" width={1000} height={500} alt={""}/>
      </div>
      <CategorySlider/>
   </main>

  );
}
