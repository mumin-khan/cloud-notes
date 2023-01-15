import React , {useContext,useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext'
const Note = () => {
  const alert_context = useContext(alertContext)
  const  {activate} = alert_context
  const context = useContext(noteContext)
  let navigate = useNavigate()
  const {notes, fetchNotes,update} = context;
  useEffect(() => {
  if (localStorage.getItem('token')){
    fetchNotes()}
  else {
   navigate('/login')
  }
    // eslint-disable-next-line
    
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
    const [note, setNote] = useState({id : "",etitle: "", edescription: "", ecategory: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id : currentNote._id , etitle: currentNote.title, edescription: currentNote.description, ecategory:currentNote.category})

      }

    const submit = (e)=>{
        console.log("Updating the note...", note)
        e.preventDefault();
     
        update(note.id,note.etitle,note.edescription,note.ecategory) 
        activate({type:'success',msg:"Updated Successfully"});

        refClose.current.click();
    }

    const change = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  
  return (
    <>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Launch static backdrop modal
        </button> 
        
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">EDIT NOTE</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form onSubmit={submit}>
  <div className="mb-3">
  
    <label htmlFor="title " className="form-label d-flex align-items-center justify-content-center"><h6>Title</h6></label>
    <div className='d-flex align-items-center justify-content-center'>
    <input type="text" className="form-control w-25" name="etitle"  minLength={5}  required  value={note.etitle} id="etitle" aria-describedby="emailHelp" onChange={change}/>
    </div>
    </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label"><h6>Description</h6></label>
    <textarea type="text" rows={5} className="form-control" value={note.edescription}   required   name="edescription" id="edescription" onChange={change} />
  </div>
  <div className="mb-3">
    <label htmlFor="category" className="form-label"><h6>Category</h6></label>
    <input type="text" className="form-control" style={{"width":"100px"}} value = {note.ecategory }    name="ecategory" id="ecategory" onChange={change} />
  </div>
  
  <button type="submit" className="btn btn-secondary">Update</button>
</form>
<div class="d-flex flex-column">
<tex className='mt-2't>{note.edescription.split(/[" "]|\n/).filter((element)=>{return element!==""}).length} words and {note.edescription.length} characters</tex>
  <text>{note.edescription.split(/[" "]|\n/).filter((element)=>{return element!==""}).length*.08} minutes read </text>
  </div>             </div>
              <div className="modal-footer">
                <button ref = {refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              
              </div>
            </div>
          </div>
        </div>
    <AddNote />
    <hr/>
    <div className='mt-3'>
    {notes.length===0 ?<h3>No notes to display</h3>:  <h4 className='mt-2'>Your Notes</h4>}
    </div>
  
    <div className='row my-3'>
     {notes.map((note)=> 
    {return <Noteitem  key ={note._id } note={note} updateNote = {updateNote}/>
   })
  }

    </div>
    </>
  )
}

export default Note
