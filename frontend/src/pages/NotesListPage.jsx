import React, { useState, useEffect } from 'react';
import notes from '../assets/data'
import ListItem from '../components/ListItem'


 
function NotesListPage() {
  const [notes, setNotes] = useState([])

  useEffect(()=>{
    getNotes()
  }, [])

  const getNotes = async ()=>{
    let URL = "http://127.0.0.1:8000/api/get-notes/";

    let response = await fetch(URL);
    let data = await response.json();
    console.log("Fetched Data Are:- ", data)

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
  </div>
  )
}
export default NotesListPage