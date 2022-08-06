import React, {useEffect} from 'react'
import MainSlider from '../components/Home/AdvertiseMain/MainSlider'
import Categories from '../components/Home/categories'
import ProductsLyout from '../components/Home/products/ProductsLyout'
import Services from '../components/Home/services'
import Footer from '../components/Footer/footer'
import NewArrival from '../components/newArrival/NewArrival'
import Newsletter from '../components/newsletter/Newsletter'
import AdvertiseMain from '../components/Home/AdvertiseMain/AdvertiseMain'
import Banner from '../components/Home/Banner'
import MainFilter from '../components/Navbar/mainFilter'


function Home() {
  useEffect(() => {
 
     // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [])
  return (
    <div>
        <MainFilter/>
        <AdvertiseMain/>
        <Banner/>
        <Categories/>
        
        <NewArrival/>
        <ProductsLyout/>
        <Services/>
        
        
    </div>
  )
}

export default Home