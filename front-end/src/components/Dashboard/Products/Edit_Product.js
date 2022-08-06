import React, { Component } from 'react'
import styled from "styled-components"
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Spinner from '../../Spinner/Spinner';
import Slide from 'react-reveal/Slide';

export default class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product : null,
            products : [],
            AdminProducts : true,
            product_images : [],
            product_pics : [],
            sizes : [],
            colors : [],
            price :"",
            discount :"",
            quantity :"",
            title : "",
            description : "",
            reviews : "",
            availability : "",
            category : "",
            tags : [],
            productId : "",
            isUpdated : null,
            isLoading : null,
            error:null,
            isDisabled: false,
        }
        this.disableRef = React.createRef() 
        this.imgInput = React.createRef()   
    }

    disableContent = () =>{
        const children = this.disableRef
        console.log(children)
        for(let i=0; i<children.length; i++){
           children[1].style.opacity = 0.4;
        }
    
    }
   
/// add colors
addColor = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        this.setState({
            colors:[...this.state.colors, e.target.value]
        });
        e.target.value = "";
      }
      console.log(this.state.colors)
    }
}
//remove colors
removeColors = (color) => {
    const colors = this.state.colors.slice();
    this.setState({
        colors: colors.filter((x) => x !== color),
    })
}
/// add tags
addTags = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        this.setState({
            tags:[...this.state.tags, e.target.value]
        });
        e.target.value = "";
      }
      console.log(this.state.tags)
    }
}
/// remove tags 
removeTags = (tag) => {
    const tags = this.state.tags.slice();
    this.setState({
        tags: tags.filter((x) => x !== tag),
    })
}
///remove size
removeSize = (size) =>{
    const sizes = this.state.sizes.slice();
    this.setState({
        sizes: sizes.filter((x) => x !== size)
    })
}
///add size
addSize = (e) =>{
    if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          this.setState({
            sizes:[...this.state.sizes, e.target.value]
        });
          e.target.value = "";
    }   }
}


// handle image input 
handleImageInput = (e) =>{
    e.preventDefault()
    if(e.target.id === e.target.name){
        return false
    }else{
        this.imgInput.current.click()
    }
}

    /// handel image change
    handleImageChange = (e) => {
        e.preventDefault()
    if (e.target.files){
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // console.log("filesArray: ", filesArray);
        console.log(this.state.productId)
        reader.onload = (e) => {
            console.log(e.target.result);
            const base64String = e.target.result.replace("data:", "").replace(/^.+,/, "");
        this.setState({
            product_images:[...this.state.product_images, base64String],
            product_pics:[...this.state.product_pics, file],
        })
        console.log(this.state.product_pics)
    }

        Array.from(e.target.files).map(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
        );
    }
};

    handelChange = (event) =>{
        this.setState({
          [event.target.name]: event.target.value,
          
        })
        console.log(event.target.value)
        console.log(this.state)
       
      }

    /// send products info to the backend
    Update_Product_submit = ( id) => {
        this.setState({
            isLoading: true,
            isDisabled : true,
        }) 
        const data = new FormData();
        this.state.product_images.forEach(pic => {
            data.append("pics", pic)
        });
        this.state.sizes.forEach(size => {
            data.append("sizes", size)
        });
        this.state.colors.forEach(color => {
            data.append("colors", color)
        });
        this.state.tags.forEach(tag => {
            data.append("tags", tag)
        })
        data.append("title", this.state.title)
        data.append("quantity", this.state.quantity)
        data.append("price", this.state.price)
        data.append("discount", this.state.discount)
        data.append("description", this.state.description)
        data.append("reviews", this.state.reviews)
        data.append("category", this.state.category)
        fetch(`/editproduct/${id}`,{
            method: "PUT",
            body: data,
        }).then(response => {
            if( response.status <= 200){
                this.setState({
                    isLoading: null,
                    isUpdated: true
                }) 
                
            }else{
                this.setState({
                    error:true
                })
            }
            return response.json()
        }
        )
        .then(data => this.props.updatedProduct(data))
        .catch(error => console.log(error.message))
    
    }
    close_Saved_Modal = () =>{
        this.setState({
            isUpdated:null,
        })
    }
    
    static getDerivedStateFromProps(props, state){
    const {Editproduct} = props;
    if (Editproduct.id !== state.productId) {
    return{
        product_images: Editproduct.product_images,
        product_pics: Editproduct.product_images,
        sizes: Editproduct.sizes,
        colors: Editproduct.colors,
        price: Editproduct.price,
        discount: Editproduct.discount,
        quantity :Editproduct.quantity,
        title: props.Editproduct.title,
        description: Editproduct.description,
        reviews: Editproduct.reviews,
        availability: Editproduct.availability,
        category: Editproduct.category,
        tags: Editproduct.tags,
        productId : Editproduct.id,
     }
    }
    return null;
    }
    
    render() { 
        const { Editproduct, close_Edit_Modal } = this.props;
        const { product_images, sizes, colors, isDisabled, price, discount, quantity, productId , title, description, reviews, availability, category, tags, isUpdated, isLoading} = this.state;
        return (
          <div>
            {Editproduct && (
              <Modal isOpen={true} ariaHideApp={false}>
                <Zoom>
                  <Edit_Product ref={this.disableRef}>
                    <div className="close-button">
                      <button
                        onClick={() => {
                          close_Edit_Modal();
                          this.close_Saved_Modal();
                        }}
                      >
                        X
                      </button>
                    </div>
                    <form id="useform">
                      <label htmlFor="Preview image"> Products Images</label>
                      <input
                        type="file"
                        name="product_images"
                        ref={this.imgInput}
                        id="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={this.handleImageChange}
                      />
                      <div>
                        <button
                          className="add-image"
                          name="imageinput"
                          id="imageinput"
                          onClick={this.handleImageInput}
                          onChange={this.handleImageChange}
                        >
                          <AddPhotoAlternateIcon />
                        </button>
                      </div>
                      <div className="productImg-container">
                        {product_images.map((img) => {
                          return (
                            <img
                              src={`data:image/jpeg;base64,${img}`}
                              alt="img"
                              key={img}
                              className="imgprview"
                              onClick={this.handleImageInput}
                            />
                          );
                        })}
                      </div>
                      <label htmlFor="title"> Product Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handelChange}
                      />
                      <label htmlFor="quantity">Quantity:</label>
                      <input
                        type="text"
                        value={quantity}
                        name="quantity"
                        onChange={this.handelChange}
                      />
                      <label htmlFor="reviews">Reviews:</label>
                      <input
                        type="text"
                        value={reviews}
                        name="reviews"
                        onChange={this.handelChange}
                      />
                      <label htmlFor="color">Color:</label>
                      <div className="colors-container">
                        {colors.map((color, index) => {
                          return (
                            <div key={index} className="color_wrapper">
                              <span className="color_name">{color} </span>
                              <span
                                className="remove_color"
                                onClick={() => this.removeColors(color)}
                              >
                                x
                              </span>
                            </div>
                          );
                        })}

                        <input
                          className="color-input"
                          type="text"
                          onKeyDown={this.addColor}
                          onChange={this.handelChange}
                        />
                      </div>
                      <label htmlFor="size">Size:</label>
                      <div className="size-container">
                        {sizes.map((size, index) => {
                          return (
                            <div key={index} className="size_wrapper">
                              <span className="size_name">{size} </span>
                              <span
                                className="remove_size"
                                onClick={() => this.removeSize(size)}
                              >
                                x
                              </span>
                            </div>
                          );
                        })}

                        <input
                          className="size-input"
                          type="text"
                          onKeyDown={this.addSize}
                          onChange={this.handelChange}
                        />
                      </div>
                      <label htmlFor="discount">Discount:</label>
                      <input
                        type="text"
                        value={discount}
                        name="discount"
                        required
                        onChange={this.handelChange}
                      />
                      <label htmlFor="Price">Price:</label>
                      <input
                        type="text"
                        value={price}
                        name="price"
                        required
                        onChange={this.handelChange}
                      />
                      <label htmlFor="availablity">Availability:</label>
                      <select id="">
                        <option
                          value={availability}
                          name="availability"
                          onChange={this.handelChange}
                        >
                          InStock
                        </option>
                        <option
                          value={availability}
                          name="availability"
                          onChange={this.handelChange}
                        >
                          Not InStock
                        </option>
                      </select>
                      <label htmlFor="category">Category:</label>
                      <select
                        id="category"
                        onChange={this.handelChange}
                        value={category}
                        name="category"
                      >
                        <option value="girls">Girls</option>
                        <option value="boys" name="boys">
                          Boys
                        </option>

                        <option value="posters" name=" posters">
                          Posters
                        </option>

                        <option value="clothes" name="clothes">
                          Clothes
                        </option>

                        <option value="notebooks" name="notebooks">
                          Notebooks
                        </option>

                        <option value="toys" name="toys">
                          Toyes
                        </option>

                        <option value="accessories" name="accessories">
                          Accessoires
                        </option>
                      </select>
                      <label htmlFor="size">Tags:</label>
                      <div className="size-container">
                        {tags.map((tag, index) => {
                          return (
                            <div key={index} className="size_wrapper">
                              <span className="size_name">{tag} </span>
                              <span
                                className="remove_size"
                                onClick={() => this.removeTags(tag)}
                              >
                                x
                              </span>
                            </div>
                          );
                        })}
                        <input
                          className="tag-input"
                          type="text"
                          onKeyDown={this.addTags}
                          onChange={this.handelChange}
                        />
                      </div>
                      <div className="description-container">
                        <label htmlFor="Description">Description:</label>
                        <textarea
                          form="useform"
                          name="description"
                          value={description}
                          onChange={this.handelChange}
                          placeholder="Description"
                        ></textarea>
                        <button
                          type="button"
                          onClick={() => {
                            this.Update_Product_submit(productId);
                            this.disableContent();
                          }}
                          className="submitButton"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    {isUpdated && (
                      <SavedWrapp>
                        <Slide left>
                          <div className="saved-container">
                            <div className="circle-1">
                              <div className="circle-2">
                                <CheckCircleIcon className="check-icon" />
                              </div>
                            </div>
                            <span> Updated Succesfully</span>
                            <button className="close-button">
                              <HighlightOffIcon className="close-icon" />
                            </button>
                          </div>
                        </Slide>
                      </SavedWrapp>
                    )}
                    {isLoading && (
                      <SavedWrapp>
                        <Spinner />
                      </SavedWrapp>
                    )}
                    {this.state.error && (
                      <SavedWrapp>
                        <p> somthing went wrong pleas try again</p>
                      </SavedWrapp>
                    )}
                  </Edit_Product>
                </Zoom>
              </Modal>
            )}
          </div>
        );
    }
}
      
    
  



const Edit_Product = styled.div`

    input{
        width:30vw;
        min-width:280px;
        max-width:380px;
    
    }
    .productImg-container{
        display:flex;
    }
    .imgprview{
        margin-right:25px
        width:150px;
        height:150px;
        object-fit:cover;
        display:flex;
    }
       .size-container, .colors-container{
        display: flex;
        align-items:center;
        padding:5px;
        flex-wrap: wrap;
        min-height: 48px;
        border: 1px solid rgb(214, 216, 218);
        border-radius: 6px;
        background:white;
        width:30vw;
        min-width:280px;
        max-width:380px;

         .size_wrapper, .color_wrapper{
            display:flex;
            align-items:center;
            


             .size_name, .color_name{
                padding:0px 5px;
                background:blue;
                color:white;
                border-radius:6px;
                margin-right:1px;
                margin-bottom:2px;

             }
             .remove_size, .remove_color{
                cursor:pointer;
                margin-right:4px;
                background:lightgrey;
                border-radius:50%;
                padding:0 5px;
                font-size:10px;
                color:red;
             }
         }
        input{
            border: 0;
            outline: none;
            padding: 0;
            min-width: 80px;
            flex:1;
            margin-bottom:0px;
            height:auto;
        }
      }
     textarea{
         height:50vh;
         width:60vw;
     }
     .submitButton{
         display:flex;
         padding:10px 20px;
         background:green;
         border-radius:8px;
         color:white;
         font-weight:bold
         width:80px;
         margin:auto;
     }
     .description-container{
        width:60vw;

     }
 `
 const SavedWrapp = styled.div`
   
    position:sticky;
    bottom:50%;
    left:40%;
    width:250px;
    height:150px;
    
    .saved-container{
        background-color:rgb(0, 255, 52);
        display:flex;
        justify-content:center;
        flex-direction:column;
        align-items: center;
        border-radius:4px;
        width:250px;
        height:150px;

    }

    .check-icon{
    font-size:50px;
    color:rgb(0, 255, 52);
    }
   
    .circle-1{
        border-radius:50%;
        background:rgb(255, 255, 255,0.6);
        width:100px;
        height:100px;
        display:flex;
        justify-content:center;
        align-items:center;
       
    };
    .circle-2{
        border-radius:50%;
        background:rgb(255, 255, 255, 0.4);
        border:1px solid rgb(255, 255, 255,0.6);
        width:80px;
        height:80px;
        display:flex;
        justify-content:center;
        align-items:center;
       
       

    };
    .close-button{
        position:absolute;
        
        top:-10px;
        right:-15px;
        background:0;
        .close-icon{
            color:red;

        }
    }
    span{
        color:rgb(255, 255, 255);
        font-weight:bolder;
        font-size:20px;
        margin-top:6px;
    }

 
 `
