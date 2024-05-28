import React from 'react'
import { Link } from "react-router-dom";

function ListItem(props) {
  return (
    <>
      <div className="container all-notes">
        <div className="card bg-dark text-light notes-list">
          <div className="card-body">
            <Link to={`/note/${props.note.slug}`}>
              <h3 className='note-body'>{props.note.body}</h3>
            </Link>
            <p className='updated_date'>{props.note.created_date}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListItem