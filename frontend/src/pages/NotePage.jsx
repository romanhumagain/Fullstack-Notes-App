import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

function NotePage() {
  const params = useParams()
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

  const handleOnChange = (event)=>{
    let text = event.target.value
    setText(text)
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
                    <h5 className="card-title my-2">{note_data.title}</h5>
                    <div className="buttons">
                      <Button className='btn-opt' variant="primary">Update</Button>
                      <Button className='btn-opt' variant="danger">Delete</Button>
                    </div>
                  </div>
                  <textarea className='note-area my-2' value={text == ""?setText(note_data.body):text} onChange={handleOnChange}></textarea>
                </div>
              )
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default NotePage