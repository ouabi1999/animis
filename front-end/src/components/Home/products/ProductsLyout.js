import React,{useState,  useEffect, useRef} from 'react'
import styled from 'styled-components'
import HomeProducts from './HomeProducts'
import {useSelector, useDispatch} from "react-redux"
import { setProducts } from '../../../features/products/productsSlice'
import axios from 'axios'
import { CircularProgress } from '@mui/material'

function ProductsLyout() {
    const dispatch = useDispatch()
    //const products = useSelector((state) => state.products?.products)
   
    
    const [nextStart, setNextStart] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [totalProducts, setTotalProducts] = useState(0)
    const [homeProducts, setHomeProducts] = useState([]);

    const scrolTo = useRef()
     // show more products
   
    
    

  const  viewMore =() => {
        setNextStart(prevStart => prevStart + 10);
        
    }





    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/get_home_products', { params: {start:nextStart, per_page : 10} })
          .then(response => {
            setIsLoading(false)
            dispatch(setProducts(response.data.products))
            setHomeProducts([...homeProducts, ...response.data.products]);
            setTotalProducts(response.data.total_products)
          })
          .catch(error => {
            setIsLoading(false)
            console.error(error);
          });
        
        
      }, [nextStart]);

    useEffect(() => {
       
        scrolTo.current?.scrollTo({behavior: "smooth", block: "center", inline: "nearest"});
      }, [nextStart])
   
   
    
   
    return (
        <Container>
            <div className="product-header">   
                <strong>More to love</strong>
            </div>
        
        
           
            <HomeProducts isLoading= {isLoading} products = {homeProducts} scrolTo = {scrolTo}  />
           
          
            
            {isLoading && (

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin:"10px" }}>
                    <CircularProgress
                        size={25}
                        thickness={4}
                    />
                </div>
            )
            }  
            {!isLoading && (
            <div className="veiw-more"  >
                <button   onClick={ viewMore} 
                 className=""
                    style= { nextStart >= totalProducts ? {opacity:"0.5" , cursor:"not-allowed"} : {} }
                 disabled = { nextStart  >= totalProducts ? true : false }> view more</button>
            </div> 
            )}

 
        </Container>
    )
}

export default ProductsLyout
const Container = styled.div`
    width:97%;
    margin:auto;
    min-height:80vh;
.product-header{
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgb(194, 193, 193);
    border-top: 1px solid rgb(194, 193, 193);
    margin:15px 5px;
    margin-top:25px;
    background-color:white;  
    }

.product-header strong{
    padding:15px;
    letter-spacing: 2px;
    font-size:1rem;
    font-weight:490;
    font-family:'Arial Narrow', Arial, sans-serif
} 



.veiw-more > button{
    outline-style: none;
    width:115px;
    height: 40px;
    outline-style: none;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin:auto;
    background: #fc4a1a;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f7b733, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    color:white;
    font-weight: bold;
    margin-bottom: 8px;
    letter-spacing: 2px;
}

`