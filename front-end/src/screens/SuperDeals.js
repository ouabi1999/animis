import React, {useEffect, useMemo, useRef, useState} from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import "../App.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import HeadeSeo from '../common/Heade';

function SuperDeals() {
    
    const products = useSelector(state=> state.products.products)
    const isProductsLoaded = useSelector(state=> state.products.isProductsLoaded)
    const displayData = useSelector(state => state.display.display)
    
    const [filtredProducts, setFiltredProducts] = useState([]);

    const [loading, setLoading] = useState(false);
    const valueIndex = window.localStorage.getItem("selectedImageSlider") || 0
    const [currentPage, setCurrentPage] = useState(1);
    const PER_PAGE = 20;
    const [totalProucts, setTotalProucts] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const scrollRef = useRef()

  useEffect(() => {

    setLoading(true)
    axios.get('/api/products_get-off-discount', { params: {currentPage, per_page: PER_PAGE } })
      .then(response => {
        setLoading(false)
        setFiltredProducts(response.data.products);
        setTotalProucts(response.data.total_products);
        setTotalPages(response.data.total_pages)
        
      })
      .catch(error => {
        setLoading(false)
        console.error(error);
      });
    
    
  }, [currentPage]);

    
    
   
    const handleChange = (event, value) => {
      setCurrentPage(value);
      scrollRef.current?.scrollIntoView({ behavior: "auto"})
    };
    

    const begin = (currentPage - 1) * PER_PAGE;
    const end = begin + PER_PAGE;

    
  
    return (
        <Wrapper>
          <HeadeSeo 
              title = "Animis - Super deals"
              description = "Shop the Best Deals on Anime Figurines, Clothing, and Accessories at Animis: Your One-Stop-Shop for All Things Anime"
           />
             {displayData?.slider?.[parseInt(valueIndex)] ? (
          <div className = "img-cover-container">
                <img  src={displayData?.slider[parseInt(valueIndex)]} alt="slider" />
          </div>
         ):
         
         <div style={{ height:"45vh", width:"100%"}} className=" skeleton"></div>
         }
        <div ref={scrollRef} />
        <div style={{ display: "flex", margin: "10px 0", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <strong className='header'>SuperDeals</strong>
            <span className='header-child'> Top products, Incredible prices.</span>
          </div>
        </div>
        
        {!loading ? (
        <Container>
           {filtredProducts?.map((product, index )=> {
                return (
                    <div key={index} className="item-container">
                        <Link to={"/product_details/" + product.id}>
                            <img src={product.pics_info[0]} alt="" />
                        </Link>
                        
                        <div className="product-title">
                            <span> {product.title}</ span>
                        </div>
                        <div className='second-child'>
                          <span className="product-price"> US ${product.price}</span>
                          <span className={ product.discount > product.price && product.discount && "product-discount"}>{product.discount > product.price ? `- ${((  product.discount - product.price  )  / product.discount * 100).toFixed(0)}% `  : ""}

                          </span>
                          
                        </div>
                        {product.shippingInfo?.map((ship, index)=>{
                          if(ship.type === "Free"){
                            return(
                              <span  key={index} className="shipping"> Free Shipping </span>
                            )
                          }
                        }  
                      )}
                        
                    </div>
                    
                    )
                })}
            
        </Container>

        

     
         ):
         <Container >
         {[0,1, 1, 1, 4, 4, 4, 4, 4, 4].map((_, index)=>{
          return(
           
              <div key = {index} className="item-container skeleton"></div>
      

          )
         })}
        </Container>
        
        }
        <div style={{display:"flex",margin:"10px 0", justifyContent:"center", width:"100%"}}>
            <Stack spacing={2}>
              <Pagination  onChange = {handleChange}  count={totalPages} variant="outlined" shape="rounded" />
            </Stack>
        </div>
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
        font-size:2rem;
        color:rebeccapurple;
       
       
    }
    .header-child{
    
      font-size:15px;
      font-family:sans-serif;
      margin-top:8px;
    }

  .img-cover-container{
    display:flex;
    justify-content:center;
   
  }
  .img-cover-container>img{
    width:70%;
  }
  @media only screen and (max-width: 490px) {
 
  .img-cover-container>img{
    width:100%;
  }
}

`
const Container = styled.div`
    display:grid;
    grid-gap:20px;
    place-content:center;
    min-height:calc(100vh - 100px);
    grid-template-columns:repeat(5, auto);
    margin-top:15px;
    
    

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
      color:#000;
      margin-left:20px;
      align-self:end;
      padding:2px 6px;
      
      background:rgb(255, 0, 0, 0.2);
      border-radius: 6px 6px 0 6px;
      
    }
    .shipping{
        font-size:11px;
        margin-left:4px;
        margin-top:10px;
        color:#006622;
        font-family:'Arial Narrow', Arial, sans-serif;
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
  .img-cover-container>img{
    width:100%;
  }
}

`