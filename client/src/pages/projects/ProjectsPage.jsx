import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../services/projects/ProjectSlice';
import MyProjectCard from '../../components/MyProjectCard';
import { getProjectByUser } from '../../services/projects/ProjectUserSlice';

const ProjectsPage = () => {

  const projectList = useSelector((state) => state.projectUser);
  const { loading,  error, projects } = projectList;
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProjectByUser("643ae09ac5a4000c86a32b06"))
  },[dispatch])

  return (
    <div>
       <h2 className='font-semibold text-lg'>Your Projects!</h2>

      <div className='flex flex-wrap items-center justify-evenly gap-6 mt-6 '>
        {projects?.map(project =>
            <MyProjectCard key={project._id} id={project._id} title={project.title} image={project.image} techStack={project.techStack} category={project.category} price={project.price} />
          )}
      </div>
    </div>
  )
}

export default ProjectsPage