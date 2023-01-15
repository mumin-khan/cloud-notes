import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext'
const Noteitem = (props) => {
    const {note,updateNote} = props
    const context = useContext(noteContext)
  const {deleteNote} = context
  const alert_context = useContext(alertContext)
   const  {activate} = alert_context


  
  return (
    <div className='col-md-3'>
        <div className="card my-3" >
    <div className="card-body">
      
    
      
    
      <div className='d-flex align-items-center'>
        <h5 className="card-title"> {note.title}</h5>
      
      <i className="  far fa-trash-alt mx-3 mb-1" onClick={()=> {deleteNote(note._id);
            activate({type:'success',msg:"Note Deleted successfully"})
}}></i>
      <i className=" far fa-edit mx-3 mb-1" onClick={()=> updateNote(note)}></i>

      </div>
      <hr/>      
      <p className="card-text"> {note.description} </p>      
      
      
    </div>
  </div>
        
    </div>
  )

  }
export default Noteitem