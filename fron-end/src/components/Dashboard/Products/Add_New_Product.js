import React, { Component, createRef } from 'react'
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default class AddNewProduct extends Component {
    constructor(props){
      super(props);
      this.state = {
        product_images:[],
        sizes: [],
        colors: [],
        price:"",
        discount:"",
        quantity:"",
        title: "",
        description: "",
        reviews: "",
        availability:"",
        category:"",
        tags:[],
        products:[]
      }
    }
  
    
    
    render(){
      const {
              product_images, tags, sizes, colors, discount,
              quantity, title, description, reviews, availability,
              category, price
            } = this.props.state;

      const {
             products, imgInput,  handelChange, removeColors,
             removeSize, handleImageChange, handleImageInput,
             addColor, addSize, addTag, AddNew_Product_submit,
             removeTag,
             CloseAddNewProduct, removeImage
            } = this.props;

      return (
            <>
                {this.props.is_addNewProduct_open && (
                    <AddNew_Product>
                        <div>
                            <button onClick={this.props.CloseAddNewProduct}>X</button>
                        </div>
                        <form id="useform">
                            <label htmlFor='Preview image'> Products Images</label>
                            <input type="file" name="product_images" ref={imgInput} id="file" style={{ display: "none" }} accept="image/*" onChange={handleImageChange } />
                            <div>
                                <button className="add-image" name="imageinput" id="imageinput" onClick={handleImageInput} onChange={handleImageChange} >
                                    <AddPhotoAlternateIcon />
                                </button>
                            </div>
                            <div className="productImg-container">
                                {product_images.map(img => {
                                    return (
                                        <div key={img.index}>
                                            <img src={img} alt="img" key={img} className="imgprview" onClick={handleImageInput} />
                                            <span className="remove_color" onClick={() => removeImage(img)}>x</span>
                                        </div>

                                    )
                                })
                                }
                            </div>
                            <label htmlFor='title'> Product Title:</label>
                            <input type="text" name="title" value={title} onChange={handelChange} />
                            <label htmlFor='quantity'>Quantity:</label>
                            <input type="text" value={quantity} name="quantity" onChange={handelChange} />
                            <label htmlFor='reviews'>Reviews:</label>
                            <input type="text" value={reviews} name="reviews" onChange={handelChange} />
                            <label htmlFor='color'>Color:</label>
                            <div className="colors-container">
                                {colors.map((color, index) => {
                                    return (
                                        <div key={index} className="color_wrapper">
                                            <span className='color_name'>{color} </span>
                                            <span className="remove_color" onClick={() => removeColors(color)}>x</span>
                                        </div>
                                    );
                                })}
                                <input className='color-input' type="text" onKeyDown={addColor} onChange={handelChange} />
                            </div>
                            <label htmlFor='size'>Size:</label>
                            <div className="size-container">
                                {sizes.map((size, index) => {
                                    return (
                                        <div key={index} className="size_wrapper">
                                            <span className='size_name'>{size} </span>
                                            <span className="remove_size" onClick={() => removeSize(size)}>x</span>
                                        </div>
                                    );
                                })}

                                <input className='size-input' type="text" onKeyDown={addSize} onChange={handelChange} />
                            </div>
                            <label htmlFor='discount'>Discount:</label>
                            <input type="text" value={discount} name="discount" required onChange={handelChange} />
                            <label htmlFor='Price'>Price:</label>
                            <input type="text" value={price} name="price" required onChange={handelChange} />
                            <label htmlFor="availablity">Availability:</label>
                            <select id="" onChange={handelChange}>
                                <option value={availability} name="availability"> InStock</option>
                                <option value={availability} name="availability"> Not InStock</option>
                            </select>
                            <label htmlFor="category">Category:</label>
                            <select id="category" onChange={handelChange} >
                                <option value={category} name="category" > Girls </option>
                                <option value={category} name="category" > Boys </option>
                                <option value={category} name="category" > Poster </option>
                                <option value={category} name="category" > Clothes </option>
                                <option value={category} name="category" > Notebooks </option>
                                <option value={category} name="category" > Toyes </option>
                                <option value={category} name="category"> Accessoires </option>
                            </select>
                            <div className="description-container">
                                <label htmlFor="Description">Description:</label>
                                <textarea form='useform' name="description" value={description} onChange={handelChange} placeholder='Description'></textarea>
                                <button type="submit" onClick={AddNew_Product_submit} className='submitButton'>Add New Product</button>
                            </div>
                            <label htmlFor='size'>Tags:</label>
                            <div className="size-container">
                                {tags.map((tag, index) => {
                                    return (
                                        <div key={index} className="size_wrapper">
                                            <span className='size_name'>{tag} </span>
                                            <span className="remove_size" onClick={() => removeTag(tag)}>x</span>
                                        </div>
                                    );
                                })}
                                <input className='tag-input' type="text" onKeyDown={addTag} onChange={handelChange} />
                            </div>
                        </form>
                    </AddNew_Product>
                )
                }
            </>
        )
    }
}

const AddNew_Product = styled.div`
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
/* <div>
     <AdminProducts
                products = {this.state.products}
                imgInput={this.imgInput}
                handleImageChange={this.handleImageChange}
                handleImageInput={this.handleImageInput}
                handelChange={this.handelChange}
                />
               <EditProduct
                products = {this.state.products}
                imgInput={this.imgInput}
                handleImageChange={this.handleImageChange}
                handleImageInput={this.handleImageInput}
                handelChange={this.handelChange}
                addColor = {this.addColor}
                removeColors = {this.removeColors}
                addSize = {this.addSize}
                removeSize = {this.removeSize}
                addTags = {this.addTags}
                removeTags = {this.removeTags}

               />
            </div>*/