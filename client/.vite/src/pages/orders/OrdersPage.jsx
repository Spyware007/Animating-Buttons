import React from 'react'
import OrderTable from '../../components/OrderTable'

const OrdersPage = ({isDarkMode}) => {
  return (
    <>
    <h2 className='font-bold text-lg transition-colors delay-5 duration-50'>Order History</h2>
      <p className='text-sm text-gray-500'>History of all your orders</p>
    
        <div className='flex justify-between'>
        
        </div>
        <div>
          <OrderTable isDarkMode={isDarkMode} />
        </div>
    </>
  )
}

export default OrdersPage