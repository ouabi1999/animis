import React, { Component, useState, createRef, useEffect } from 'react'
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';





  function AddNewProduct(props) {
    const [formData, setFormData] = useState({
      product_images: [],
      sizes: [],
      colors: [],
      price: "",
      discount: "",
      quantity: "",
      title: "",
      description: "",
      reviews: "",
      availability: "",
      product_type:"",
      pics_info : "",
      shipping_Method:"",
      seo : "",
      category: "",
      tags: [],
      products: [],
      Description_images:{}
    });

    const imgInput = createRef()

    const { 
      CloseAddNewProduct,
      is_addNewProduct_open,
    } = props;

    const names = [
      "all",
      "clothes",
      "accessoires",
      "posters",
      "stickers",
      "notebooks",
      "gadget",
    ];

    /// send products info to the backend
    const AddNew_Product_submit = (event) => {
      event.preventDefault();
      const data = new FormData();
      for (let i = 0; i < formData.product_images.length; i++) {
        data.append("images", formData.product_images[i]);
      }

      formData.sizes.forEach((size) => {
        data.append("sizes", size);
      });
      formData.colors.forEach((color) => {
        data.append("colors", color);
      });
      formData.tags.forEach((tag) => {
        data.append("tags", tag);
      });
      data.append("title", formData.title);
      data.append("quantity", formData.quantity);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("description", formData.description);
      data.append("reviews", formData.reviews);
      data.append("category", formData.category);
      data.append("shipping_Method", formData.shipping_Method);
      data.append("seo", formData.seo);
      data.append("pics_info", formData.pics_info);
      data.append("product_type", formData.product_type);
      



      fetch("/products", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) =>  props.responseData(data))
        .catch((err) => console.log(err));
    };

    // fetch product info grom the backend or server

    useEffect(() => {
      fetch("/productsinfo")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) =>
          setFormData({
            ...formData,
            products: data,
            AdminProducts: true,
          })
        )

        .then((err) => console.log(err));
    }, []);

    /// add colors
    const addColor = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          setFormData({
            ...formData,
            colors: [...formData.colors, e.target.value],
          });
          e.target.value = "";
        }
      
      }
    };
    //remove colors
    const removeColors = (color) => {
      const colors = formData.colors.slice();
      setFormData({
        ...formData,
        colors: colors.filter((x) => x !== color),
      });
    };
    /// add tags
    const addTag = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          setFormData({
            ...formData,
            tags: [...formData.tags, e.target.value],
          });
          e.target.value = "";
        }
      }
    };
    const removeImage = (index) => {
      const product_images = formData.product_images.slice();
      setFormData({
        ...formData,
        product_images: product_images.filter((x) => x !== index),
      });
    };
    
    /// remove tags
    const removeTag = (tag) => {
      const tags = formData.tags.slice();
      setFormData({
        ...formData,
        tags: tags.filter((x) => x !== tag),
      });
    };

    ///remove size
    const removeSize = (size) => {
      const sizes = formData.sizes.slice();
      setFormData({
        ...formData,
        sizes: sizes.filter((x) => x !== size),
      });
    };
    ///add size
    const addSize = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          setFormData({
            ...formData,
            sizes: [...formData.sizes, e.target.value],
          });
          e.target.value = "";
        }
      }
    };
    // handle change input
    const handelChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
      console.log(formData);
    };

    // handle image input
    const handleImageInput = (e) => {
      e.preventDefault();
      if (e.target.id === e.target.name) {
        return false;
      } else {
       imgInput.current.click();
      }
    };

    /// handel image change
    const handleImageChange = (e) => {
      e.preventDefault();
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setFormData({
              ...formData,
              product_images: [...formData.product_images, reader.result],
            });
            console.log(formData)
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };

  
    return (
      <>
        {is_addNewProduct_open && (
          <AddNew_Product>
            <Left_container id="useform">
              <div className="exit-button">
                <button onClick={CloseAddNewProduct}>X</button>
              </div>
              <div className="wrapper">
                <ProductTitle>
                  <div>
                    <label htmlFor="title"> Product Title</label>
                    <div className="title">
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                </ProductTitle>

                <Discription>
                  <div>
                    <label htmlFor="Description">Description</label>
                    <div className="description">
                      <textarea
                        form="useform"
                        name="description"
                        value={formData.description}
                        onChange={handelChange}
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                </Discription>
              </div>

              <Media>
                <label htmlFor="Preview image"> Products Images</label>
                <div className="productImg-container">
                  <input
                    type="file"
                    name="product_images"
                    ref={imgInput}
                    id="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                 <div>
                    <button
                      className="add-image"
                      name="imageinput"
                      id="imageinput"
                      onClick={handleImageInput}
                      onChange={handleImageChange}
                    >
                      <AddPhotoAlternateIcon className="add_photo_icon" />
                    </button>
                    </div>


                  {formData.product_images?.map((img) => {
                    return (
                      <div key={img.index}>
                        <img
                          src={img}
                          alt="img"
                          className="imgprview"
                          onClick={handleImageInput}
                        />
                        <span
                          className="remove_image"
                          onClick={() => removeImage(img)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Media>

              <Pricing>
                <div>
                  <label htmlFor="discount">Discount</label>
                  <div className="discount">
                    <input
                      type="text"
                      value={formData.discount}
                      name="discount"
                      required
                      onChange={handelChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="Price">Price</label>
                  <div className="price">
                    <input
                      type="text"
                      value={formData.price}
                      name="price"
                      required
                      onChange={handelChange}
                    />
                  </div>
                </div>
              </Pricing>

              <button
                type="submit"
                onClick={AddNew_Product_submit}
                className="submitButton"
              >
                Add New Product
              </button>
            </Left_container>
            <Right_container>
              <Organization>
                <div className="category-container">
                  <h4>Organization</h4>
                  <TextField
                    className="text_input"
                    id="filled-select-category"
                    select
                    label="Category"
                    /*helperText="Please select your currency"*/
                    value={formData.category}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        category: event.target.value,
                      })
                    }
                  >
                    {names.map((option) => (
                      <MenuItem key={option.value} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <div>
                    <TextField className="text_input" 
                               value={formData.product_type} 
                               label="Product type" 
                               name="product_type" 
                               onChange = {handelChange}
                    />
                  </div>
                </div>
              </Organization>
              <Iventory>
                <div>
                  <h4>Inventory</h4>
                  <div className="availability">
                    <TextField
                      className="text_input"
                      select
                      label="Availability"
                      /*helperText="Please select your currency"*/
                      value={formData.availability}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          availability: event.target.value,
                        })
                      }
                    >
                      <MenuItem value={"In Stock"}>In Stock</MenuItem>
                      <MenuItem value={"In Stock"}>Not In Stock</MenuItem>
                    </TextField>
                  </div>
                </div>
                <div>
                  <TextField
                    className = "text_input"
                    onChange = {handelChange}
                    name = "quantity"
                    value = {formData.quantity}
                    label = "Quantity"
                  />
                </div>
              </Iventory>
              <Variant>
                <h4>Variant</h4>
                <div>
                  <TextField
                    className = "text_input"
                    label = "Reviews"
                    value = {formData.reviews}
                    name  = "reviews"
                    onChange = {handelChange}
                  />
                </div>

                <label htmlFor = "color">Color</label>
                <div className = "colors-container">
                  {formData.colors?.map((color, index) => {
                    return (
                      <div key = {index} className="color_wrapper">
                        <span className = "color_name">{color} </span>
                        <span
                          className = "remove_color"
                          onClick = {() => removeColors(color)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                  <input
                    className="color-input"
                    type="text"
                    onKeyDown={addColor}
                    onChange={handelChange}
                  />
                </div>
                <label htmlFor="size">Size</label>
                <div className="size-container">
                  {formData.sizes?.map((size, index) => {
                    return (
                      <div key={index} className="size_wrapper">
                        <span className="size_name">{size} </span>
                        <span
                          className="remove_size"
                          onClick={() => removeSize(size)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}

                  <input
                    className="size-input"
                    type="text"
                    onKeyDown={addSize}
                    onChange={handelChange}
                  />
                </div>
              </Variant>

              <Tgas>
                <label htmlFor="tag">Tags</label>
                <div className="tag-container">
                  {formData.tags?.map((tag, index) => {
                    return (
                      <div key={index} className="tag_wrapper">
                        <span className="tag_name">{tag} </span>
                        <span
                          className="remove_tag"
                          onClick={() => removeTag(tag)}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                  <input
                    className="tag-input"
                    type="text"
                    onKeyDown={addTag}
                    onChange={handelChange}
                  />
                </div>
              </Tgas>
            </Right_container>
          </AddNew_Product>
        )}
      </>
    );
  }
  export default AddNewProduct;

  const AddNew_Product = styled.div`
     display:flex;
     
    


    
    
    .submitButton{
        display:flex;
        padding:10px 20px;
        background:blue;
        border-radius:8px;
        color:white;
        font-weight:bold
        width:80px;
        margin:auto;
    }
    
    
 `;
  const Left_container = styled.div`
    flex: 2;

    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;
    margin-right: 10px;
  `;
  const Right_container = styled.div`
    
    flex: 0.7;
    .text_input{
      width: 100%;
      background:#fff;
      margin-bottom:15px;
    }
  `;
  const ProductTitle = styled.div`
    margin-bottom: 10px;
    input {
      width: 45vw;
      height: 45px;
      min-width: 220px;
      border-radius: 6px;
      border: 1px solid lightgray;
      &:focus {
        outline: 1px solid lightblue;
      }
    }
  `;
  const Discription = styled.div`
    textarea {
      height: 50vh;
      width: 45vw;
      border: 1px solid lightgray;
      border-radius: 6px;
      &:focus {
        outline: 1px solid lightblue;
      }
    }

  `;

  const Media = styled.div`
    background: #FFFF;
    padding: 10px;
    border-radius: 6px;
    margin:15px 0;
    border:1px solid lightgray;

    .productImg-container {
      display: flex;
      align-items:center;
      flex-wrap:wrap;
     

      

    }
    .remove_image {
      cursor: pointer;
      background: lightgrey;
      border-radius: 50%;
      padding: 2px 10px;
      font-size: 16px;
      color: red;
      position:relative;
      top:-143px;
      right:13px;
      
    }
    
    .imgprview {
      margin-left: 5px;
      width: 150px;
      height: 150px;
      object-fit: cover;
      border: 1px solid lightblue;
    }
    button{
      background:0;
       
    }
    .add_photo_icon {
      font-size:10rem;
      color: lightgray;
      
      
    }
  `;

  const Organization = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;
  `

  const Pricing = styled.div`
    padding: 10px;
    border-radius: 6px;
    margin:15px 0;
    border:1px solid lightgray;
    margin-bottom: 10px;
    input {
      width: 45vw;
      margin-bottom: 10px;
      height: 45px;
      min-width: 220px;
      border-radius: 6px;
      border: 1px solid lightgray;
      &:focus {
        outline: 1px solid lightblue;
      }
    }
  `;

  const Tgas = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;

    .tag-container {
      display: flex;
      align-items: center;
      padding: 5px;
      flex-wrap: wrap;
      min-height: 48px;
      border: 1px solid rgb(214, 216, 218);
      border-radius: 6px;
      background: white;
    }

    .tag_wrapper {
      display: flex;
      align-items: center;
    }
    .tag_name {
      padding: 0px 5px;
      background: blue;
      color: white;
      border-radius: 4px;
      margin-right: 1px;
      margin-bottom: 2px;
    }

    .remove_tag {
      cursor: pointer;
      margin-right: 4px;
      background: lightgrey;
      border-radius: 50%;
      padding: 0 5px;
      font-size: 10px;
      color: red;
    }
    input {
      border: 0;
      outline: none;
      padding: 0;
      flex: 1;
      margin-bottom: 0px;
      height: auto;
    }
  `;
  const Iventory = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;

    
  

   
  `;

  const Variant = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;
    
    .size-container,
    .colors-container {
      display: flex;
      align-items: center;
      padding: 5px;
      flex-wrap: wrap;
      min-height: 48px;
      border: 1px solid rgb(214, 216, 218);
      border-radius: 6px;
      background: white;

      .size_wrapper,
      .color_wrapper {
        display: flex;
        align-items: center;

        .size_name,
        .color_name {
          padding: 0px 5px;
          background: blue;
          color: white;
          border-radius: 6px;
          margin-right: 1px;
          margin-bottom: 2px;
        }
        .remove_size,
        .remove_color {
          cursor: pointer;
          margin-right: 4px;
          background: lightgrey;
          border-radius: 50%;
          padding: 0 5px;
          font-size: 10px;
          color: red;
        }
      }
      input {
        border: 0;
        outline: none;
        padding: 0;
        min-width: 80px;
        flex: 1;
        margin-bottom: 0px;
        height: auto;
      }
    }
  `;


