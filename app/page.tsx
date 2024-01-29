'use client'
import dynamic from 'next/dynamic'
import React, { useState } from "react";
import parse from 'html-react-parser';
import axios from 'axios';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})




const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

function  onSubmit (value: string) {
console.log(value)
  let data={content : value}
    axios.post('/api/sendposts/index', data)
    .then((response) => {
      console.log(response)
})
.catch((e) => { console.log(e)}
)}

export default function Home() {
  const [value, setValue] = useState('');



  return (
    <div>
      <h1>Home Page</h1>
  
  </div>
  )}