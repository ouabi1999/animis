import {  Slider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';




const SliderProton = (props) => {
  

  return (
    <Container>
      <Slider
        value={props.value}
        onChange={(e)=> props.handleChangePrice(e.target.value)}
        valueLabelDisplay='on'
        min={5}
        max={200}
      />

    </Container>
  );
};

export default SliderProton;

const Container = styled.div`
      margin-top:40px;

`