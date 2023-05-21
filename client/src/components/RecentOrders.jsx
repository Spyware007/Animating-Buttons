import React from 'react'
import OrderTable from './OrderTable'


const RecentOrders = ({isDarkMode}) => {
  const borderClassName = isDarkMode ? "border-gray-700" : "border-neutral-300";
  const rootClassName = isDarkMode ? "dark-mode" : "light-mode";
  return (
    <div className={`mt-10 border ${borderClassName} rounded-lg p-6 ${rootClassName}`}>
        <div className='flex justify-between'>
        <h2 className='font-semibold'>Recent Orders</h2>
        <h2 className='text-primary font-semibold cursor-pointer'>View all orders</h2>
        </div>
        <div>
          <OrderTable isDarkMode={isDarkMode} />
        </div>
    </div>
  )
}

export default RecentOrders
