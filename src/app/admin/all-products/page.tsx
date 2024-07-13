
import SideNavAdmin from '@/components/SideNavAdmin';

import ProductTable from '@/components/ProductTable';
import ProductGrid from '@/components/ProductGrid';

const page = () => {

  return (
    <div className='flex justify-between'>
        <SideNavAdmin />
        <ProductGrid />
    </div>
  )
}

export default page
