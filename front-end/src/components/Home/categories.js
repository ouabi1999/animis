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
                <Wrapp className='accessories box-shadow'/>
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
   height:350px;
   padding:10px;
   
   img{
      width:80px;
      height:90px;
    
   }
   a{
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1),
    0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
       border-radius:10px:
   }
  
   div{
    background: rgb(211,63,251);
    background: radial-gradient(circle, rgba(211,63,251,0.38139005602240894) 0%, rgba(251,117,55,0.227328431372549) 100%);
        
       border-radius:10px;
       padding:0 5px;  
   }

   h1{
       font-weight:small;
       
   }
   .box-shadow{
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1),
    0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);

 }
    
   

`
const Accessories_container = styled.div`
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    
    .accessories{
        background-image:url("catogorey/anime-bags.jpg");
        width:100%;
        height:245px;
    }

`

const Clothes_conatiner = styled.div`
   
    grid-column: 3 / span 1;
    grid-row: 1 ;

`
const Bags_container = styled.div`
    grid-column: 4 / span 1;
    grid-row: 1 ;
    
`


const Toyes_container = styled.div`
    grid-column: 5 / span 1;
    grid-row: 1 ;
   

`

const Poster_container = styled.div`
   
    
`
const Wrapp = styled.div`
    
    a{
        display:flex;
        justify-content:space-between;
    }
`

