import React from 'react'
import { Link, useParams } from 'react-router-dom'
import notes from '../assets/data'
import { Button } from 'react-bootstrap';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

function NotePage() {
  const params = useParams()
  const noteId = params.note_id

  let note = notes.find(note => note.id === Number(noteId))

  return (
    <>
      <div className="container">
        <h2>
        <Link className='back-arrow ' to={"/"}>
          <ArrowLeft/>
        </Link>
        </h2>
        <div className="card note-details">
          <div className="card-body">
            <div className="note-header">
              <h5 className="card-title my-2">Note title</h5>
              <div className="buttons">
                <Button className='btn-opt' variant="primary">Update</Button>
                <Button className='btn-opt' variant="danger">Delete</Button>
              </div>
            </div>
            <textarea className='note-area my-2' value={note ? note.body : "Note doesn't exists !"} ></textarea>
          </div>
        </div>
      </div>
    </>
    // <div></div>
  )
}

export default NotePage