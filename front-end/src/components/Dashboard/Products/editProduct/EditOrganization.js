import React from 'react'
import styled from 'styled-components';

import { Button, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';


function EditOrganization({formData, setFormData, handelChange}) {
    const categories = [
        "all",
        "clothing",
        "accessoires",
        "posters",
        "stickers",
        "notebooks",
        "gadget",
        "toyes",
        "bags"
      ];
      const types = [
        "t-shirt",
        "shirt",
        "outdore",
        "handmade",
        "school",
        "key-chain",
        "rings",
        "earnings",
        "braclets",
        "watches",
        "nickles",
        "phone case",
        "earphone case",
        "other",
      ];
      const series = [
        "one piece",
        "dr stone",
        "bleach",
        "naruto",
        "vinland saga",
        "attack on titan",
        "hunter x hunter",
        "jujutsu kiesun",
        "one punch man",
        "black clover",
        "baki",
        "spy x",
        "other",
      ];
    return (
        <Container>
            <div className="category-container">
                <h4 style={{fontFamily:"sans-serif"}}>Organization</h4>
                <TextField
                    className="text_input"
                    id="filled-select-category"
                    select
                    name ="category"
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
                    {categories.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <div>
                    <TextField className="text_input"
                        select
                        value={formData.product_type}
                        label="Product type"
                        name="product_type"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                product_type: event.target.value,
                            })
                        }
                        >
                        {types.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div>
                    <TextField className="text_input"
                        select
                        value={formData.series}
                        label="Serie"
                        name="series"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                series: event.target.value,
                            })
                        }
                        >
                        {series.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
        
                        ))}
                    </TextField>
                </div>
            </div>
        </Container>
  )
}

export default EditOrganization

  const Container = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;
  `