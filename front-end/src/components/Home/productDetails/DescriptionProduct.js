import React from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function DescriptionProduct({product}) {
  return (
      <Container>
          <ReactQuill
              value={product.description}
              readOnly={true}
              theme={"bubble"}
          />
      </Container>
  )
}

export default DescriptionProduct
const  Container = styled.div`

    width:100%;
    padding:10px;
   
  
   p{
    font-size:15px;
    line-height:35px;
  }
  
  img{
    height:auto;
    width:100%;
  }

`