import { style } from '@mui/system'
import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Fade from "react-reveal/Fade"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { applyFilters, filterByCategory, handleSelectCategory } from '../../features/categories/categorySlice'


const Categories = () => {
  const [Data , setData] = useState([])
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()
  const displayData = useSelector(state=> state.display.display)

  const filter = (itemCategory) =>{
  
    dispatch(handleSelectCategory(itemCategory))
      
  }
  
 useEffect(() => {
   console.log(displayData)
 }, [displayData])
 

    return (
        <Container>
        <Categories_header>
            <div className="border"></div>
            <h3>Featured Categories</h3>
            <div className="border"></div>
        </Categories_header>
        
        <Categories_container>
            
            <Clothes_conatiner className='box-shadow'>
                <h2>{displayData.category[0]?.categoryName}</h2>

                <Wrapp>
                    <Link to ="category" onClick={()=> filter(displayData.category[0]?.categoryName)}>
                        
                        <img  src={displayData.category[0]?.img1}  alt="" />
                        <img  src={displayData.category[0]?.img2}  alt="" />
                        <img  src={displayData.category[0]?.img3}  alt="" />
                         
                
                    </Link>
                </Wrapp>

            </Clothes_conatiner>

            <Toyes_container className='box-shadow'>
                <h2>{displayData.category[1]?.categoryName}</h2>
                <Wrapp>
                    <Link to ="category" onClick={()=> filter(displayData.category[1]?.categoryName)}>
                        
                        <img  src={displayData.category[1]?.img1}  alt="" />
                        <img  src={displayData.category[1]?.img2}  alt="" />
                        <img  src={displayData.category[1]?.img3}  alt="" />
                         
                
                    </Link>
                </Wrapp>
            </Toyes_container>

                <Bags_container className='box-shadow'>
                <h2>{displayData.category[2]?.categoryName}</h2>
                <Wrapp>
                    <Link to ="category" onClick={()=> filter(displayData.category[1]?.categoryName)}>
                        
                        <img  src={displayData.category[2]?.img1}  alt="" />
                        <img  src={displayData.category[2]?.img2}  alt="" />
                        <img  src={displayData.category[2]?.img3}  alt="" />
                         
                
                    </Link>
                </Wrapp>
                </Bags_container>

            <Accessories_container  data = {displayData.category[3]} className='box-shadow'>
            <h2>{displayData.category[3]?.categoryName}</h2>
                
                    <Link to ="category" onClick={()=> filter(displayData.category[3]?.categoryName)}>
                    <Wrapp className='accessories box-shadow'>
                    </Wrapp>  
                    </Link>
                

            </Accessories_container>
            <Poster_container className='box-shadow'>
            <h2>{displayData.category[4]?.categoryName}</h2>
                <Wrapp>
                    <Link to ="category" onClick={()=> filter(displayData.category[1]?.categoryName)}>
                        <img  src={displayData.category[4]?.img1}  alt="" />
                        <img  src={displayData.category[4]?.img2}  alt="" />
                        <img  src={displayData.category[4]?.img3}  alt="" />
                    </Link>
                </Wrapp>
            </Poster_container>    
    </Categories_container>
 
    </Container>
    )
    
}
export default Categories

const Container  = styled.div` 

    h2{
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-transform:capitalize;
        padding:5px 0;
     }

`
const Categories_header  = styled.div`
    width:95%;
    text-align:center;
    background:#ffff;
    margin:auto;

   
   .border{
       border-top:1px solid rgb(181, 178, 178);
       margin: 18px auto;    
 }
 
`

const Categories_container = styled.div`
 
   margin-top:10px;
   display:grid;
   grid-gap:10px;
   width:95%;
   margin:auto;
   min-height:350px;
   padding:10px;
   min-width:320px;
   
   img{
      margin:0;
      padding:0;
      width:95px;
      height:100px;
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1),
    0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius:6px;
    
   }
   
  
   

   h2{
       font-weight:small;
       margin: 4px 0;
       font-size:18px;
       
   }
   .box-shadow{
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1),
    0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    background: rgb(204, 179, 255);

    padding:5px 10px; 

 }
    
   

`
const Accessories_container = styled.div`
    grid-column: 1 / span 3 ;
    grid-row: 1 / span 2;
    
    
    .accessories{
        background:url(${props => props?.data?.img1});
        width:100%;
        height:270px;
        object-fit:cover;
        border-radius:8px;
        box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
        0px 2px 5px 0px rgba(50, 50, 93, 0.1),
        0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
       
    }

    @media only screen and (max-width:1112px) {
      &{
        grid-column: 1 / span 2;
        
       
    }
}
    
`

const Clothes_conatiner = styled.div`
   
   @media only screen and (max-width:1112px) {
      &{
        grid-column: 1 / span 2;
        grid-row: 3 / span 1;
       
    }
}

`
const Bags_container = styled.div`
    grid-column: 5 / span 1 ;
    grid-row: 1 ;
    @media only screen and (max-width:1112px) {
      &{
        grid-column: 3 / span 1;
        grid-row: 2 / span 1;
       
    }
}
@media only screen and (max-width:700px) {
      &{
        grid-column: 1 / span 2;
        grid-row:8 ;
        
       
    }
}
    
`


const Toyes_container = styled.div`
    grid-column: 4 ;
    grid-row: 1 ;
    @media only screen and (max-width:1112px) {
      &{
        grid-column: 3 / span 1;
        
       
    }
}  
@media only screen and (max-width:700px) {
      &{
        grid-column: 1 / span 2;
        grid-row:7 ;
        
       
    }
}


`

const Poster_container = styled.div`
    grid-column: 4 ;
    grid-row: 2 ;

    @media only screen and (max-width:1112px) {
      &{
        grid-column: 3 / span 1;
        grid-row:3 ;
        
       
    }
} 
@media only screen and (max-width:700px) {
      &{
        grid-column: 1 / span 2;
        grid-row:9 ;
        
       
    }
} 
    
`
const Wrapp = styled.div`
    margin:0;
    a{
        display:flex;
        justify-content:space-between;
    }
    
`

