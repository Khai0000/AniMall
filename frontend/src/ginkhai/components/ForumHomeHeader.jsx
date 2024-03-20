import { useState } from 'react';
import "../styles/ForumHomeHeader.css";
import SearchIcon from '@mui/icons-material/Search';

const ForumHomeHeader = () => {

  const [selectedButtons, setSelectedButtons] = useState([]);

  const toggleButton = (button) => {
    if (selectedButtons.includes(button)) {
      setSelectedButtons(selectedButtons.filter(item => item !== button));
    } else {
      setSelectedButtons([...selectedButtons, button]);
    }
  };

  return (
    <div className="forumFilterContainer">
      <div className="inputContainer">
        <input type="text" placeholder="Search for a discussion..." />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="forumButtonContainer">
        <button
          className={selectedButtons.includes('Cat') ? 'selected' : ''}
          onClick={() => toggleButton('Cat')}
        >
          Cat
        </button>
        <button
          className={selectedButtons.includes('Dog') ? 'selected' : ''}
          onClick={() => toggleButton('Dog')}
        >
          Dog
        </button>
        <button
          className={selectedButtons.includes('Others') ? 'selected' : ''}
          onClick={() => toggleButton('Others')}
        >
          Others
        </button>
        
        <button
          className={selectedButtons.includes('Others') ? 'selected' : ''}
          onClick={() => toggleButton('Others')}
        >
          Others
        </button>
      </div>
    </div>
  );
};

export default ForumHomeHeader;
