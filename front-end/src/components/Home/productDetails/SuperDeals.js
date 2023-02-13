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
           
            }).slice(0, 9).map((product, index )=> {
                return (
                    <div key={index}>
                        <Link to={"/product_details/" + product.id}>
                            <img src={product.colors[0]} alt="" />
                        </Link>
                        <span> ${product.price}</span>
                        
                    </div>
                    
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
    background: rgb(195,255,253);
    background: linear-gradient(90deg, rgba(195,255,253,1) 0%, rgba(203,252,254,0.9976365546218487) 45%, rgba(121,250,255,1) 100%);
    display:grid;
    grid-gap:10px;
 
    grid-template-columns:repeat(3, auto);

    width:360px;
    height:450px;
    padding:10px;
    border-radius:8px;
    margin-top:10px;
   div{
     display:flex;
     flex-direction:column;
     align-items:center;

   }
   span{
    font-size:15px;
    color:red;
   }
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