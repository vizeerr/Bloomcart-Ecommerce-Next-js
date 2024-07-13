import ProductDetails from "@/components/ProductDetails"

const page = ({ params }: { params: { details: string } }) => {
  const id = params.details
  return (  
   <div>
    <ProductDetails id = {params.details}/>
   </div>
  )
}

export default page
