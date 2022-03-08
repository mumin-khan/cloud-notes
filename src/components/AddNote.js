import React, {useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext'
const AddNote = () => {
  const alert_context = useContext(alertContext)
   const  {activate} = alert_context
  const context = useContext(noteContext)
  const {addNote} = context
  const [note,setNote] = useState({title:"",description:"",category:""})
  const submit = (event)=>{
      event.preventDefault()
      addNote(note.title,note.description,note.category)
      activate({type:'success',msg:"Note Added successfully"})
      setNote({title: "", description: "", category: ""})

  }
  const change = (event)=>{
      setNote({...note,[event.target.name]:event.target.value})
  }
  return (
    <div className='container'>
      <h3>Add Your notes</h3>
        <form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" name="title" value={note.title} id="title" minLength={5}  required onChange={change}/>
    </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name="description"  value={note.description} minLength={5}  required id="description" onChange={change} />
  </div>
  <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <input type="text" className="form-control" value={note.category} name="category" id="category" onChange={change} />
  </div>
  
  <button type="submit" className="btn btn-primary" >Add</button>
</form>
    </div>
  )
}

export default AddNote