import React from 'react';
import Button from '@mui/material/Button';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <Button onClick={toggleDarkMode} variant="contained" className="theme-toggle">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;
