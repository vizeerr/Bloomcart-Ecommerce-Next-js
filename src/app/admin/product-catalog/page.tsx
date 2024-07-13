
import SideNavAdmin from '@/components/SideNavAdmin';

import ProductTable from '@/components/ProductTable';

const page = () => {

  return (
    <div className='flex justify-between'>
        <SideNavAdmin />
        <ProductTable/>
        
    </div>
  )
}

export default page
