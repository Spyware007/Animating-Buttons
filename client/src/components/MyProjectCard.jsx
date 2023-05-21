import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyProjectCard = ({ title, image, category, techStack, price, id, isDarkMode }) => {
  const navigate = useNavigate();
  const techStackArray = techStack.split(',');

  return (
    <div className={isDarkMode ? 'max-w-[250px] bg-gray-800 p-2 rounded-md' : 'max-w-[250px] bg-blue-50 p-2 rounded-md transition-all delay-50 duration-500'}>
      <img src={image} alt="project" className="w-[250px] h-[150px] rounded-md object-cover" />
      <p className={`truncate font-medium mt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</p>
      <p className={`text-sm truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Category: <span className="font-semibold">{category}</span>
      </p>
      <div className="flex mt-2 gap-2">
        {techStackArray.map((tag, idx) => (
          <p
            key={idx}
            className={`text-sm truncate ${
              isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-blue-100 text-blue-800'
            } px-2 rounded-md`}
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Price: <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>${price}</span>
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate(`/detail/${id}`)}
            className={`${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-200 text-black'
            } text-sm px-3 py-2 rounded-md font-semibold transition-all delay-50 duration-500`}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProjectCard;
