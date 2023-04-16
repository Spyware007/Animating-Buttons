import React from 'react'
import OrderTable from './OrderTable'


const RecentOrders = () => {


  return (
    <div className='mt-10 border border-neutral-300 rounded-lg p-6'>
        <div className='flex justify-between'>
        <h2 className='font-semibold'>Recent Orders</h2>
        <h2 className='text-primary font-semibold cursor-pointer'>View all orders</h2>
        </div>
        <div>
          <OrderTable />
        </div>
    </div>
  )
}

export default RecentOrders
