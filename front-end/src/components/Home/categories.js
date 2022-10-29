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

  const filter = (itemCategory) =>{
  
    dispatch(handleSelectCategory(itemCategory))
      
  }
  
 

    return (
        <>
        <Categories_header>
            <div className="border"></div>
            <h3>Featured Categories</h3>
            <div className="border"></div>
        </Categories_header>
        
        <Categories_container>
            
            <Clothes_conatiner className='box-shadow'>
                <h2>Clothes</h2>

                <Wrapp>
                    <Link to ="category" onClick={()=> filter("clothes")}>
                        <img src="catogorey/anime-clothes.jpg" alt="clothes" />
                
                    
                        <img src="catogorey/anime-clothes.jpg" alt="clothes" />
                    
                    
                        <img src="catogorey/anime-clothes.jpg" alt="clothes" />
                
                    </Link>
                </Wrapp>

            </Clothes_conatiner>

            <Toyes_container className='box-shadow'>
                <h2>Toyes</h2>
                <Wrapp>
                <Link to="/category" onClick={ ()=> filter("toys")}>
                    <img src="catogorey/anime-toys.jpg" alt="anime-toys"  />
                    <img src="catogorey/anime-toys.jpg" alt="anime-toys"  />

                    <img src="catogorey/anime-toys.jpg" alt="anime-toys"  />
                </Link>
                
                </Wrapp>
            </Toyes_container>

                <Bags_container className='box-shadow'>
                    <h2>Bags</h2>
                    <Wrapp>
                    <Link to="/category" onClick={()=> filter("bags")}>
                            <img src="catogorey/anime-bags.jpg" alt="anime-bags" />
                       
                            <img src="catogorey/anime-bags.jpg" alt="anime-bags" />
                        
                            <img src="catogorey/anime-bags.jpg" alt="anime-bags" />
                    </Link>
                    </Wrapp>
                </Bags_container>

            <Accessories_container className='box-shadow'>
                <h2>Accessories</h2>
                <Wrapp className='accessories '/>
                <Link to="/category" onClick={ ()=> filter("accessories")}></Link>
                <Wrapp/>

            </Accessories_container>
            <Poster_container className='box-shadow'>
                <h2>Posters</h2>
                <Wrapp> 
                <Link to="/category" onClick={()=> filter("posters")}>

                    <img src="catogorey/poster-wall.jpg" alt="poster wall" />
                    <img src="catogorey/poster-wall.jpg" alt="poster wall" />
                    <img src="catogorey/poster-wall.jpg" alt="poster wall" />

                </Link>
                </Wrapp>
            </Poster_container>     
    </Categories_container>
    </>
    )
    
}
export default Categories

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
   
   img{
      margin:0;
      padding:0;
      width:90px;
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
    background: rgb(255, 255, 255, 0.4);
        
    border-radius:8px;
    padding:5px 10px; 

 }
    
   

`
const Accessories_container = styled.div`
    grid-column: 1 / span 3 ;
    grid-row: 1 / span 2;
    
    .accessories{
        background-image:url("catogorey/anime-bags.jpg");
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

