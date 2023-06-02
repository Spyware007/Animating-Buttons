import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import the CSS file for styling

const App = () => {
  const handleSaveChanges = () => {
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.innerHTML = "<div class='loader'></div>";
    setTimeout(() => {
      saveBtn.innerHTML = "Changes Saved";
      saveBtn.style.background = "#0000FF";
      saveBtn.style.color = "#333";
      saveBtn.style.pointerEvents = "none";
    }, 2000);
  };

  return (
    <div>
      <button className="save-btn" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
