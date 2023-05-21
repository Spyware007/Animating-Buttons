import React from 'react'
import RecentOrders from '../../components/RecentOrders'
import RecentProjects from '../../components/RecentProjects'

const DashboardPage = ({isDarkMode}) => {
  const rootClassName = isDarkMode ? "dark-mode" : "light-mode";
  const textClassName = isDarkMode ? "text-white" : "text-black";
  return (
    <div className={`${rootClassName} `}>
      {/* <h2 className='text-gray-400 font-semibold text-lg'>Happy new month, <span className='font-bold text-black'>Vimal</span></h2> */}
      <h2 className={`font-bold text-lg ${textClassName} transition-colors delay-5 duration-50`}>Happy new month!</h2>
      <p className='text-sm text-gray-500'>Welcome to your dashboard</p>
      <div>
        <RecentOrders isDarkMode={isDarkMode} />
        <RecentProjects isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}

export default DashboardPage