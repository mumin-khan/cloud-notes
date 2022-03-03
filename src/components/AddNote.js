import React, {useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
  const context = useContext(noteContext)
  const {addNote} = context
  const [note,setNote] = useState({title:"",description:"",category:"general"})
  const submit = (event)=>{
      event.preventDefault();
      addNote(note.title,note.description,note.category)

  }
  const change = (event)=>{
      setNote({...note,[event.target.name]:event.target.value})
  }
  return (
    <div>
        <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" onChange={change}/>
    </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name="description" id="description" onChange={change} />
  </div>
  <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <input type="text" className="form-control" name="category" id="category" onChange={change} />
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={submit}>Add</button>
</form>
    </div>
  )
}

export default AddNote