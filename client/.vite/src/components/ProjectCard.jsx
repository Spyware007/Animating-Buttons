import React from "react";
import { useNavigate, useParams } from 'react-router-dom';

const ProjectCard = ({ title, image, category, techStack, price, id, isDarkMode }) => {
  const navigate = useNavigate();
  const techStackArray = techStack.split(",");

  return (
    <div className={`max-w-[250px] p-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50'} transition-colors delay-50 duration-500`}>
      <img
        src={image}
        alt="project"
        className="w-[250px] h-[150px] rounded-md object-cover"
      />
      <p className={`truncate font-medium mt-2 ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
        {title}
      </p>
      <p className={`text-sm truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        Category: <span className="font-semibold">{category}</span>
      </p>
      <div className="flex mt-2 gap-2">
        {techStackArray.map((tag, idx) => (
          <p key={idx} className={`text-sm truncate ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-100 text-gray-800'} px-2 rounded-md`}>
            {tag}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
            Price: <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>${price}</span>
          </p>
        </div>
        <div>
          <button onClick={() => navigate(`/detail/${id}`)} className={`text-sm px-3 py-2 rounded-md font-semibold ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-200 text-gray-800'}`}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
