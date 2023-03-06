import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';





const RatinigFilterToggle = ({ options, value, handleSelectRating }) => {
 
 
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(e) => handleSelectRating(e.target.value)}
      
    >
      {options.map(({ label, id, value }) => (
        <ToggleButton key={id} value={value}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default RatinigFilterToggle;