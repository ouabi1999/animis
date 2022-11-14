import React from 'react'
import styled from 'styled-components'

function Description({formData, handelChange}) {
    return (
        <Container>
            <div>
                <label htmlFor="Description" style={{fontFamily:"sans-serif"}} >Description</label>
                <div className="description">
                    <textarea
                        form="useform"
                        name="description"
                        value={formData.description}
                        onChange={handelChange}
                        placeholder="Text"
                    ></textarea>
                </div>
            </div>
        </Container>
    )
}

export default Description

const Container = styled.div`

    textarea {
      height: 50vh;
      width: 45vw;
      border: 1px solid lightgray;
      padding:10px;
      border-radius: 6px;
      &:focus {
        outline: 1px solid lightblue;
      }
    }

  `