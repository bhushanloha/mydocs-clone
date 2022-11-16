import { useEffect, useState} from "react";
import Quill from 'quill';
import "quill/dist/quill.snow.css";


import { Box } from "@mui/material"
import styled from "@emotion/styled";
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'

const Component =styled.div`
  background: #F5F5F5;
`

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];




const Editer = () => {

  const[socket, setsocket] = useState();
  const[quill, setquill]= useState();

  const{ id } = useParams();


  // quill server
  useEffect(() => {

    const quillserver = new Quill("#container", { theme:"snow", modules:{toolbar: toolbarOptions}})
  
    quillserver.disable();
    quillserver.setText("Loading doc....")
    setquill(quillserver)
    
  },[])

  // socket server
  useEffect(()=>{
    const socketserver = io("http://localhost:9000");
    setsocket(socketserver)

    return ()=>{
      socketserver.disconnect();
    }

  },[])


  // sending data to server 
  useEffect(()=>{

    if (socket === null || quill === null) return;

    const handlechange = (delta, olddelta, source)=>{
      if(source !== 'user'){
        return
      }

      socket && socket.emit('send-changes', delta)
    }

    quill && quill.on('text-change', handlechange)

      return ()=>{
       quill && quill.off('text-chane', handlechange )
      }
    
  },[quill, socket])


// receiving data from server 
useEffect(()=>{

  if (socket === null || quill === null) return;

  const handlechange = (delta, olddelta, source)=>{

    quill.updateContents(delta);

  }

    socket && socket.on('receive-changes', handlechange)

    return ()=>{
     socket && socket.off('text-chane', handlechange )
    }
  
},[quill, socket])


// updating data 
useEffect(()=>{

  if (socket === null || quill === null) return;

  const interval = setInterval(()=>{

      socket &&  socket.emit("save-document", quill.getContents())

  },2000)

  return ()=>{
    clearInterval(interval)
  }
  
},[quill, socket])


// for id
useEffect(() => {
  if(quill === null || socket === null)return;

  socket && socket.once('load-document', document => {
    quill.setContents(document);
    quill.enable();
  })

  socket && socket.emit('get-document', id)
  
}, [quill, socket, id])


  

  return (
    <Component>
         <Box className="container" id="container"></Box>
    </Component>

  )
}

export default Editer;