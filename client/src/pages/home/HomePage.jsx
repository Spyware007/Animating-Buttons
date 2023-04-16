import React, { useEffect } from 'react'
import ProjectCard from '../../components/ProjectCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../services/projects/ProjectSlice';

const HomePage = () => {

  const projectList = useSelector((state) => state.project);
  const { loading, allProjects, error, page, pages } = projectList;
  const dispatch = useDispatch()
  console.log(allProjects)

  useEffect(()=>{
    dispatch(getAllProjects())
  },[dispatch])

  return (
    <div>
       <h2 className='font-semibold text-lg'>Welcome to ProjectMart!</h2>
      <p className='text-sm text-gray-500'>Browse the projects</p>

      <div className='flex flex-wrap items-center justify-evenly gap-6 mt-6 '>
        {allProjects?.map(project =>
            <ProjectCard key={project._id} id={project._id} title={project.title} image={project.image} techStack={project.techStack} category={project.category} price={project.price} />
          )}
      </div>
    </div>
  )
}

export default HomePage