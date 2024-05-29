import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton';


function NotesListPage() {
  const [notes, setNotes] = useState([])

  useEffect(()=>{
    getNotes()
  }, [])

  const getNotes = async ()=>{
    let URL = "http://127.0.0.1:8000/api/get-notes/";

    let response = await fetch(URL);
    let data = await response.json();
    setNotes(data)
  }
  return (
    <div className='container'>
      <div className="notes-lists">
      {notes.map((note, index) => (
        <div key={index}>
          <ListItem key={index} note={note}/>
        </div>
      ))}
    </div>
    <AddButton/>
  </div>
  )
}
export default NotesListPage