import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { categoryList } from '../../../common/categoryList';
import { styled as style} from '@mui/material/styles';

const StyledToggleButtonGroup = style(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));



const FilterCategoryToggle = (props) => {
  
  return (
    <Container>
      <StyledToggleButtonGroup
        value={props.selectedCategory}
        exclusive
        onChange={(e) => props.handleSelectCategory(e.target.value)}
        className="toggle"
        variant="outlined"
      >
        {categoryList?.map(({ label, id, value }) => (
          <ToggleButton key={id} value={value} variant="outlined" style={{border:"1px solid lightgray"}} className="toggle-button">
            
            {label}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Container>
  );
};

export default FilterCategoryToggle;
const Container =  styled.div`
    .toggle{

      display:grid;
      grid-template-columns: auto auto;
      gap: 10px;

    }
    .toggle-button{
       
    }

`