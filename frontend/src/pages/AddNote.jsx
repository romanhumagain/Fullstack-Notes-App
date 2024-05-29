import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function AddNote() {
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")

  const handleOnChange = (event)=>{
    let text = event.target.value
    setText(text)
  }

  const handleOnChangeTitle = (event)=>{
    let title = event.target.value
    setTitle(title)
  }

  const addNote =async () => { 
    if(!title || !text){
      toast.error('Please provide title and note body!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }

    else{
    const URL = 'http://127.0.0.1:8000/api/create-note/'
    const data = {
      title:title,
      body:text
    }
    try{
      const response = await fetch(URL, {
        method:"POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if(!response.ok){
        throw new Error("Network response was not ok !")
      }

      const result = await response.json()
      console.log(result)

      setTimeout(() => {
        navigate('/')
      }, 1500);

      toast.success('Successfully Created Note.', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      

    }catch (error){
      console.log("ERROR OCCUR", error)
    }
  }
  }


  return (
    <>
      <div className="container">
        <h2>
        </h2>
        <div className="card note-details">
          <div className="card-body">
                  <div className="note-header">
                    <input className='title-input fw-bold fs-4' value={title} onChange={handleOnChangeTitle} placeholder='Title'></input>
                    <h5 className="card-title my-2"></h5>
                    <div className="buttons">
                      <Button className='btn-opt' variant="primary" onClick={addNote}>Add Note</Button>
                    </div>
                  </div>
                  <textarea className='note-area my-2 fw-normal' value={text} onChange={handleOnChange} placeholder='Note Body'></textarea>
                </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default AddNote