import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditDescription({formData, setFormData, handelChange}) {
    const [value, setValue] = useState('');
    useEffect(() => {
        setFormData({
            ...formData,
            description: value

        })
    }, [value])

    const handleChange = (content, delta, source, editor) => {
        console.log(editor.getHTML());
        // console.log(JSON.stringify(editor.getContents())); // delta 사용시
        setValue(editor.getHTML());
       
      };
      const modules = {
        toolbar: [
          //[{ 'font': [] }],
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ["clean"],
        ],
      };
      
      const formats = [
        //'font',
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "color",
        "background",
      ];
        return (

            <Container>
                <label htmlFor="Description" style={{fontFamily:"sans-serif"}} >Description</label>
                <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}

                />
            </Container>
        )
    }

export default EditDescription

const Container = styled.div`

.wrapper-class {
        padding: 1rem;
        border: 1px solid #ccc;
      }

    .editor-class {
        background-color:#fff;
        padding: 1rem;
        border: 1px solid #ccc;
      }

      .toolbar-class {
          border: 1px solid #ccc;
 }

  `