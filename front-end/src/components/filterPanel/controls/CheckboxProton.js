import { Checkbox, FormControlLabel} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const CheckboxProton = (props) => {
  
  const dispatch = useDispatch()
  return (
    <Container>
      {props.product_type.map((item) => (
        
      <FormControlLabel key={item.index}
        
        control={
          <Checkbox
            size='small'
            checked={item.checked}
            onChange={() => props.handleChangeChecked(item.id)}
            inputProps={{ 'aria-label': 'checkbox with small size'}}
          />
        }
        label={item.label}
      />
      
))}
    </Container>
  );
};

export default CheckboxProton;
const Container = styled.div`
       
`