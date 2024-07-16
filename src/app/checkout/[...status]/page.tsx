import OrderPlacedBox from '@/components/OrderPlacedBox'
import React from 'react'

const page = ({ params }: { params: { status: string } }) => {

  return <OrderPlacedBox status = {params.status[0]} id={params.status[1]}/>
}

export default page
