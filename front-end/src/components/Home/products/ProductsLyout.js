import React,{useState} from 'react'
import styled from 'styled-components'
import HomeProducts from './HomeProducts'
import ProductDetails from "./productDetails"

function ProductsLyout() {

    const [product, setProduct] = useState(null)
    // show more products
    const viewMore = () => {
        
    }
    // show product details
    const openModal = (product) => {
        setProduct(product);
    }
    /// close product details
    const closeModal = () => {
        setProduct(null)
    }
    return (
        <Container>
            <div className="product-header">
                <div className="border-headers"></div>
                <h2> Top rankings</h2>
                <div className="border-headers"></div>
            </div>
        
            <HomeProducts openModal = {openModal} />
            <div className="veiw-more">
                <button onClick={() => { viewMore() }}> View more</button>
            </div>
            <ProductDetails
             closeModal = {closeModal}
             product = {product}
             
             />
        </Container>
    )
}

export default ProductsLyout
const Container = styled.div`
    width:95%;
    margin:auto;
.product-header{
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgb(194, 193, 193);
    border-top: 1px solid rgb(194, 193, 193);
    margin:20px 10px;
    background-color:white;
    
}
.product-header h3{
    font-weight: bolder;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: xx-large;
}



.veiw-more > button{
    outline-style: none;
    width:120px;
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