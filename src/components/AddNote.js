import React, {useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext'
import "../addNote.css"
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
      <h3 id="box">Add Your notes</h3>
        <form onSubmit={submit}>
  <div className="mb-3 ">
  {/* <div class="col-lg-4 col-lg-offset-4"> */}
    <label htmlFor="title" className="form-label d-flex align-items-center justify-content-center " ><h3>Title</h3></label>
    <div className='d-flex align-items-center justify-content-center'>
    <input type="text" className="form-control w-25 " name="title" value={note.title} id="title" minLength={5}  required onChange={change}/>
    </div>
    </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label"><h3>Description</h3></label>
    <textarea type="text" className="form-control" name="description" rows={10} value={note.description} minLength={5}  required id="description" onChange={change} />
  </div>
  <div className="mb-3">
    <label htmlFor="category" className="form-label "><h5>Category</h5></label>
    <div className='d-flex'>
    <input type="text" className="form-control " style={{"width":"100px"}} value={note.category} name="category" id="category" onChange={change} />
    </div>
  </div>
  
  <button type="submit" className="btn btn-secondary" >Add</button>
</form>
<div class="d-flex flex-column">
<tex className='mt-2't>{note.description.split(/[" "]|\n/).filter((element)=>{return element!==""}).length} words and {note.description.length} characters</tex>
  <text>{note.description.split(/[" "]|\n/).filter((element)=>{return element!==""}).length*.08} minutes read </text>
  </div>
    </div>
  )
}

export default AddNote