import React from 'react'
import { ReactComponent as AddBtn} from '../assets/add.svg'
import { Link } from 'react-router-dom'

function AddButton() {
  return (
    <div className='add-btn-container'>
      <Link to="/note/new" className='add-btn'>
    <AddBtn  /> 
    </Link>
    </div>
  )
}

export default AddButton