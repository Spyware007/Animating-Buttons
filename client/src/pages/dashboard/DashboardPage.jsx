import React from 'react'
import RecentOrders from '../../components/RecentOrders'
import RecentProjects from '../../components/RecentProjects'

const DashboardPage = () => {
  return (
    <div>
      {/* <h2 className='text-gray-400 font-semibold text-lg'>Happy new month, <span className='font-bold text-black'>Vimal</span></h2> */}
      <h2 className='font-bold text-lg'>Happy new month!</h2>
      <p className='text-sm text-gray-500'>Welcome to your dashboard</p>
      <div>
        <RecentOrders />
        <RecentProjects />
      </div>
    </div>
  )
}

export default DashboardPage