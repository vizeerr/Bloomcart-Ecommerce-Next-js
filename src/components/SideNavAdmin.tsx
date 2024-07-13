import React from 'react'
import Link from 'next/link'

const SideNavAdmin = () => {
  return (
    <aside id="default-sidebar" className="left-0 shadow-lg z-10 sticky top-20 w-72 h-[89vh] transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-md dark:bg-gray-800">
        <ul className="flex flex-col gap-4">
            <Link href={'/admin/'} className='text-xl flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'> Dashboard</Link>
            <Link href={'/admin/add-product'} className='text-xl flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'> Add Product</Link>
            <Link href={'/admin/product-catalog'} className='text-xl flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'> Product Catalog</Link>
            <Link href={'/admin/all-products'} className='text-xl flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'> All Products</Link>

        </ul>
    </div>
    </aside>
  )
}

export default SideNavAdmin
