import React, { useState } from 'react'
import styled from "styled-components"
import { Button, MenuItem, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



function Shipping({formData,  setFormData}) {
    const [shipping, setShipping]= useState({
        type : "",
        price : "",
        from : "",
        to : "",
      });

    const addShipping = (e) => {
        e.preventDefault()   
        setFormData({
            ...formData,
            shippingData: [...formData.shippingData, shipping]

        })

        setShipping({
            type: "",
            price: "",
            from: "",
            to:""
        })


    }

    const remove_ShippingMethod = (method) => {
        const shipping_Method = formData.shippingData.slice();
        setFormData({
            ...formData,
            shippingData: shipping_Method.filter((x) => x !== method),
        });
    };

    return (
        <Container>
            <h4 style={{ fontFamily:"sans-serif" }}>Shipping</h4>
            {formData.shippingData?.map((item, index) => {
                return (
                    <div key={index} className="shipping_method_wrapper">
                        <span className="method_name">{item.type} </span>
                        <CancelIcon
                            className="remove-icon"
                            onClick={() => remove_ShippingMethod(item)}
                        />
                          
                    </div>
                );
            })}
            <div className="availability">
                <TextField
                    required
                    className="text_input"
                    select
                    label="Shipping Method"
                    /*helperText="Please select your currency"*/
                    value={shipping.type}
                    onChange={(event) =>
                        setShipping({
                            ...shipping,
                            type: event.target.value,
                        })
                    }
                >
                    <MenuItem value={"Free"}> Free</MenuItem>
                    <MenuItem value={"e-Packet"}> e-Packet</MenuItem>
                    <MenuItem value={"UPS"}>UPS</MenuItem>
                    <MenuItem value={"USPS"}>USPS</MenuItem>
                    <MenuItem value={"FedEx"}>FedEx</MenuItem>
                    <MenuItem value={"DHL"}>DHL</MenuItem>
                    <MenuItem value={"EMS"}>EMS</MenuItem>
                    <MenuItem value={"CPO & Air Mail"}>CPO & Air Mai</MenuItem>
                    <MenuItem value={"Standard Shipping"}> Standard Shipping </MenuItem>
                </TextField>
            </div>
            <div>
                <TextField className="text_input"
                    required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                    type="number"
                    value={shipping.price}
                    label="Shipping Price"
                    name="shipping price"
                    onChange={(event) =>
                        setShipping({
                            ...shipping,
                            price: event.target.value,
                        })
                    }
                />
            </div>
            <span style={{fontSize:"12px", fontFamily:"sans-serif", marginBottom:"15px" }}>Delivery</span>
            <div>
                <TextField
                    required
                    className="text_input"
                    name="from"
                    value={shipping.from}
                    label="From "
                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                    type="number"
                    onChange={(event) =>
                        setShipping({
                            ...shipping,
                            from : event.target.value,
                        })
                    }
                />
                 <TextField
                    required
                    className ="text_input"
                    name="to"
                    value={shipping.to}
                    label="To"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                    type="number"
                    onChange = {(event) =>
                        setShipping({
                            ...shipping,
                            to: event.target.value,
                        })
                    }
                />
            </div>
            <Button variant="contained" onClick={addShipping}>Add</Button>

        </Container>
    )
}

export default Shipping

const Container = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;

      
      .shipping_method_wrapper{
        display: flex;
        align-items: center;
        position:relative;

        
        .method_name {
          padding: 0px 5px;
          background:goldenrod;
          color: white;
          border-radius: 4px;
          margin-right: 1px;
          margin-bottom: 15px;
        }
       
    
    button{
       text-transform:capitalize;
    }

    .remove-icon{
        cursor: pointer;
        position:absolute;
        box-shadow: 2px 4px 4px  rgb(0, 0, 0, 0.45);
        background:#fff;
        border-radius:50%;
        color:red;
        font-size:15px;
        top:-8px;
        left:45px;
        z-index:1;
      }
    
      }
`