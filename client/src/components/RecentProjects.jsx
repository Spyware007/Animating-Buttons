import React, { useMemo } from 'react'
import { recentProjectsData } from '../mock/mockData'
import {MdOutlineAdd} from "react-icons/md"

const RecentProjects = ({isDarkMode}) => {
    const rootClassName = isDarkMode ? 'dark-mode' : 'light-mode';
  const borderClassName = isDarkMode ? 'border-gray-700' : 'border-neutral-300';
  const textClassName = isDarkMode ? 'text-white' : 'text-gray-500';
  const bgClassName = isDarkMode ? 'bg-gray-700' : 'bg-blue-100';
  return (
    <div className={`mt-10 border ${borderClassName} rounded-lg p-6 ${rootClassName}`}>
        <div className='flex justify-between'>
        <h2 className='font-semibold'>Recent Projects</h2>
        <h2 className='text-primary font-semibold cursor-pointer'>View all projects</h2>
        </div>
        <div className='flex mt-6 gap-4 justify-evenly flex-wrap '>
            <div className='max-w-[190px] overflow-hidden'>
                <img src="https://i.ytimg.com/vi/0fYi8SGA20k/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDWce0k5XmT0oYgy1xdoRsioH_u5A" alt="Thumbnail" className=' rounded-lg object-cover' />
                <p className='mt-2 truncate text-sm'>3d Website with Three.js | React</p>
                <p className='text-sm'>Price: <span className='font-semibold'>$1200</span></p>
            </div>
            <div className='max-w-[190px] overflow-hidden'>
                <img src="https://i.ytimg.com/vi/0fYi8SGA20k/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDWce0k5XmT0oYgy1xdoRsioH_u5A" alt="Thumbnail" className=' rounded-lg object-cover' />
                <p className='mt-2 truncate text-sm'>3d Website with Three.js | React</p>
                <p className='text-sm'>Price: <span className='font-semibold'>$1200</span></p>
            </div>
            <div className='max-w-[190px] overflow-hidden'>
                <img src="https://i.ytimg.com/vi/0fYi8SGA20k/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDWce0k5XmT0oYgy1xdoRsioH_u5A" alt="Thumbnail" className='rounded-lg  object-cover' />
                <p className='mt-2 truncate text-sm'>3d Website with Three.js | React</p>
                <p className='text-sm'>Price: <span className='font-semibold'>$1200</span></p>
            </div>
            <div className={`flex flex-col items-center justify-center w-[190px] h-[107px] rounded-lg ${bgClassName} cursor-pointer`}>
                <MdOutlineAdd size={25} className={`border-2 rounded-md ${borderClassName}`} color='blue' />
                <p className={`mt-2 text-sm ${textClassName} font-semibold`}>Add new Project</p>
            </div>
        </div>
    </div>
  )
}

export default RecentProjects;

