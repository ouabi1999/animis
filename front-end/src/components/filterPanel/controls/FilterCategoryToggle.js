import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';





const FilterCategoryToggle = (props) => {
  const dispatch = useDispatch()
  const categoryList = [

    {
      id: 0,
      value: 'all',
      label: 'All',
    },
    {
      id: 1,
      value: 'clothing',
      label: 'Clothing',
    },
    {
      id: 2,
      value: 'accessoires',
      label: "Accessoires",
    },
    {
        id: 3,
        value: 'stickers',
        label: "Stickers",
      },
      {
        id: 4,
        value:'bags',
        label: "Bags",
      },
      {
        id: 5,
        value: 'toys',
        label: "Toys",
      },
      {
        id: 6,
        value: 'posters',
        label: "Posters",
      },
      {
        id: 7,
        value: 'gadget',
        label: "gadget",
      },
      {
        id: 8,
        value: 'notebooks',
        label: "notebooks",
      },
  ];
  
  return (
    <Container>
      <ToggleButtonGroup
        value={props.selectedCategory}
        exclusive
        onChange={ (e) => props.handleSelectCategory(e.target.value)}
        className="toggle"

      >
        {categoryList.map(({ label, id, value }) => (
          <ToggleButton key={id} value={value} variant="outlined">
            
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
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

`