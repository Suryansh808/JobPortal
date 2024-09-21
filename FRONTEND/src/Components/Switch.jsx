import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Switch.css';

const ToggleComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the initial state from localStorage
    const storedState = localStorage.getItem('toggleState') === 'true';
    setIsChecked(storedState);
  }, [navigate]);

  const handleToggle = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    
    // Store the new state in localStorage
    localStorage.setItem('toggleState', checked);

    // Navigate based on the checkbox state
    if (checked) {
      navigate("/Recruitment");
    } else {
      navigate("/");
    }
  };

  return (
    
    <div id="Switch">
      <input
        id="checkboxInput"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        aria-checked={isChecked}
        role="switch"
        tabIndex="0"
      />
      <label
        className="toggleSwitch"
        htmlFor="checkboxInput"
        aria-label="Toggle switch"
      ></label>
    </div>



  );
};

export default ToggleComponent;
