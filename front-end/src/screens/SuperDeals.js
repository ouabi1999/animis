import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

function SuperDeals() {
    
    const products = useSelector(state=> state.products.products)
    return (
        <Wrapper>
        <div style={{display:"flex", alignItems:"center",flexWrap:"wrap", marginLeft:"45px"}}>
           <h1 className='header'>SuperDeals</h1>
           <span className='header-child'> Top products, Incredible prices.</span>
        </div>
         
        <Container>
            {products.filter(product => {
              
               return (product.discount - product.price) / product.discount * 100   >= 10;
           
            }).map((product, index )=> {
                return (
                    <div key={index} className="item-container">
                        <Link to={"/product_details/" + product.id}>
                            <img src={product.colors[0]} alt="" />
                        </Link>
                        
                        <div className="product-title">
                            <span> {product.title}</ span>
                        </div>
                        <div className='second-child'>
                          <span className="product-price"> US ${product.price}</span>
                          <span className="product-discount">{product.discount > product.price ? `${((product.discount - product.price) / product.discount * 100).toFixed(0)} % `  : ""}
                          </span>
                          
                        </div>
                        
                    </div>
                    
                )
            })}
            
        </Container>
        </Wrapper>
  )
}

export default SuperDeals

const Wrapper = styled.div`
    background: rgb(195,255,253);
    background: linear-gradient(90deg, rgba(195,255,253,1) 0%, rgba(203,252,254,0.9976365546218487) 45%, rgba(121,250,255,1) 100%);
    padding:10px;
  
    .header{
        font-weight:bolder;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding-right:10px;
        padding-bottom:6px;
       
    }
    .header-child{
    
        font-size:20px;
       
        font-family:sans-serif;
    }
`
const Container = styled.div`
    display:grid;
    grid-gap:20px;
    place-content:center;
    min-height:calc(100vh - 100px);
    grid-template-columns:repeat(5, auto);
    
    

   .item-container{
    background-color:rgb(250, 250, 250);
    border-radius:8px;
    width:230px;
    min-height:320px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    

   }
   

   img{
    width:100%;
    border-radius:8px;
  
    
   }

   .second-child{
    margin-top:10px;
   }
   .product-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
      font-size:13px;
      max-width:220px;
      width:100%;
      margin-top:0;
      padding:0 5px;
   }
   .product-price{
      color:#000000;
      margin-left:5px;
      font-family:'Trebuchet MS', sans-serif;
    }

    .product-discount{
      font-size:13px;
      text-decoration:line-through;
      color:#000;
      margin-left:20px;
      align-self:end;
      padding:2px 6px;
      
      background:rgb(255, 0, 0, 0.2);
      border-radius: 6px 6px 0 6px;
      
    }

    @media only screen and (max-width: 1200px) {
 &{
     
    grid-template-columns: repeat(4,auto);
  }
}

    @media only screen and (max-width: 950px) {
      &{
     
        grid-template-columns: repeat(3, 30%);
      } 
    }

    @media only screen and (max-width: 730px) {
      &{
          grid-template-columns: repeat(2,auto); 
        }
 
      }

  @media only screen and (max-width: 490px) {
 &{
     
    grid-template-columns: repeat(1, auto);
  }
}

`