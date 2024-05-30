import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NotePage() {
  const params = useParams()
  const navigate = useNavigate()

  const slug_field = params.slug


  const [note, setNote] = useState([])

  const [text, setText] = useState("")
  const [title, setTitle] = useState("")


  useEffect(() => {
    getNote()
  }, [])

  const getNote = async () => {
    const URL = `http://127.0.0.1:8000/api/fetch-note/${slug_field}/`

    const response = await fetch(URL);
    const data = await response.json();
    setNote(data)
  }

  const handleOnChange = (event) => {
    let text = event.target.value
    setText(text)
  }

  const handleOnChangeTitle = (event) => {
    let title = event.target.value
    setTitle(title)
  }

  const updateNote = async () => {
    const data = {
      title: title,
      body: text
    };

    const URL = `http://127.0.0.1:8000/api/update-note/${slug_field}/`;

    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();


      setTimeout(() => {
        navigate('/')
      }, 2500);

      toast.success('Successfully Updated Note.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const deleteNote = async () => {
    const URL = `http://127.0.0.1:8000/api/delete-note/${slug_field}/`
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })

      navigate('/')

      if (!response.ok) {
        throw new Error("Network response was not ok !")
      }


    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }

  }

  return (
    <>
      <div className="container">
        <h2>
        </h2>
        <div className="card note-details">
          <div className="card-body">
            {
              note.map((note_data, index) => (
                <div key={index}>
                  <div className="note-header">
                    <input className='title-input fw-bold fs-4' value={title == "" ? setTitle(note_data.title) : title} onChange={handleOnChangeTitle}></input>
                    <h5 className="card-title my-2"></h5>
                    <div className="buttons">
                      <Button className='btn-opt' variant="primary" onClick={updateNote}>Update</Button>
                      <Button className='btn-opt' variant="danger" onClick={deleteNote} >Delete</Button>
                    </div>
                  </div>
                  <textarea className='note-area my-2 fw-normal ' value={text == "" ? setText(note_data.body) : text} onChange={handleOnChange}></textarea>
                  <div className="footer d-flex g-4 ">
                    <p className="card-link fw-lighter">Created:- {note_data.created_date}</p>
                    <p className="card-link fw-lighter ">Last Update :- {note_data.updated_date}</p>
                  </div>
                </div>
              )
              )
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default NotePage