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

                <div className='box-shadow Clothes_conatiner '>
                    <h2>Clothes</h2>
                    <Wrapp>
                        <Link to="category" onClick={() => filter("clothes")}>
                            <img src="catogorey/anime-clothes.jpg" alt="clothes" />
                            <img src="catogorey/anime-clothes.jpg" alt="clothes" />
                            <img src="catogorey/anime-clothes.jpg" alt="clothes" />
                        </Link>
                    </Wrapp>
                </div>

                <div className='box-shadow Toyes_container'>
                    <h2>Toyes</h2>
                    <Wrapp>
                        <Link to="/category" onClick={() => filter("toys")}>
                            <img src="catogorey/anime-toys.jpg" alt="anime-toys" />
                            <img src="catogorey/anime-toys.jpg" alt="anime-toys" />
                            <img src="catogorey/anime-toys.jpg" alt="anime-toys" />
                        </Link>
                    </Wrapp>
                </div>

                <div className='box-shadow Bags_container'>
                    <h2>Bags</h2>
                    <Wrapp>
                        <Link to="/category" onClick={() => filter("bags")}>
                            <img src="catogorey/anime-bags.jpg" alt="anime-bags" />

                            <img src="catogorey/anime-bags.jpg" alt="anime-bags" />

                            <img src="catogorey/anime-bags.jpg" alt="anime-bags" />
                        </Link>
                    </Wrapp>
                </div>

                <div className='box-shadow Accessories_container'>
                    <h2>Accessories</h2>
                    <Wrapp>
                    <Link to="/category" onClick={() => filter("accessories")}>
                        <img src="catogorey/poster-wall.jpg" alt="poster wall" />
                        <img src="catogorey/poster-wall.jpg" alt="poster wall" />
                        <img src="catogorey/poster-wall.jpg" alt="poster wall" />
                    </Link>
                    </Wrapp >
                </div>

                <div className='box-shadow Poster_container'>
                    <h2>Posters</h2>
                    <Wrapp>
                        <Link to="/category" onClick={() => filter("posters")}>                         
                            <img src="catogorey/poster-wall.jpg" alt="poster wall" />
                            <img src="catogorey/poster-wall.jpg" alt="poster wall" />
                            <img src="catogorey/poster-wall.jpg" alt="poster wall" />

                        </Link>
                    </Wrapp>
                </div>

            </Categories_container>
        </>
    )
    
}
export default Categories

const Categories_header = styled.div`
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
      width:80px;
      height:90px; 
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
      border-radius:6px;
   }

   
  
   div{
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
    padding-bottom:10px

 }
    
   




.Accessories_container{
    grid-column: 1 / span 2;
    grid-row: 2 ;
}
.Clothes_conatiner {
   
    grid-column: 3 / span 1;
    grid-row: 1 ;

}
.Bags_container {
    grid-column: 4 / span 1;
    grid-row: 1 ;
}  



.Toyes_container{
    grid-column: 5 / span 1;
    grid-row: 1 ;
   
}

.Poster_container{
   
    grid-column: 1 / span 2;
    grid-row: 1;
}

@media only screen and (max-width:1200px) {
       
.Clothes_conatiner {
   
   grid-column: 3 / span 2;
   grid-row: 1 ;

}
.Bags_container {
   grid-column: 3 / span 2;
   grid-row: 2;
}  



.Toyes_container{
   grid-column: 1 / span 2;
   grid-row: 3 ;
  
}

.Accessories_container {
    grid-column: 1 / span 2;
    grid-row:  2;
      
    }
.Poster_container{
   
   grid-column: 1 / span 2;
   grid-row: 1 ;
}
img{
      width:25%;
      height:auto; 
     
   }
}  
@media only screen and (max-width:630px) {

 .Clothes_conatiner {
   
   grid-column: 1/ span 2;
   grid-row: 1 ;

}
.Bags_container {
   grid-column: 1/ span 2 ;
   grid-row: 2;
}  



.Toyes_container{
   grid-column: 1/ span 2 ;
   grid-row: 3 ;
  
}

.Accessories_container {
    grid-column: 1/ span 2;
    grid-row:  4;
      
    }
.Poster_container{

   grid-column: 1 / span 2;
   grid-row: 5 ;
}
img{
      width:30%;
      height:auto; 
   }

}

`
const Wrapp = styled.div`
    
    a{
        display:flex;
        justify-content:space-between;
    }
`

