import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

function SuperDeals() {
    
    const products = useSelector(state=> state.products.products)
    return (
        <Container>
     
            {products.filter(item => {
              
               return (item.discount - item.price) / item.discount * 100   >= 10;
           
            }).slice(0, 12).map(product => {
                return (
                    <>
                        <Link to={"/product_details/" + product.id}>
                            <img src={product.colors[0]} alt="" />
                        </Link>
                        
                    </>
                    
                )
            })}
            
        </Container>
  )
}

export default SuperDeals

const Container = styled.div`
    position:sticky;
    
    top:15%;
    right:0;
    margin-left:auto;
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,0.05085784313725494) 0%, rgba(255,186,45,0.700717787114846) 100%);
    display:grid;
    grid-gap:10px;
 
    grid-template-columns:repeat(3, auto);

    width:360px;
    height:500px;
    padding:10px;
    border-radius:8px;
    margin-top:10px;
   
   img{
    width:100px;
    height:100px;
    border-radius:8px;
   }

   @media only screen and (max-width: 1200px){
    &{
     display:none;
    }
}
`