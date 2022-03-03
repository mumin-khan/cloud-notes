import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
  
   const inital = []
   const host ="http://localhost:5000"     
       
    const [notes, setNotes] = useState(inital);
    //Fetch Notes
    const fetchNotes = async ()=>{
      //API Call
      const response = await fetch(`${host}/api/notes/fetch-notes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
       
        
        headers: {
          'Content-Type': 'application/json',
          'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjBiNWMwMzA0YWNjMjY5MjRkYTM5In0sImlhdCI6MTY0NTYxMTg2OH0.D6prkzpltS41CDWx3o-5MetqNJzhE_3avH6V87O3lFg'
        },
        
        
      });
      const resp = await response.json()
      setNotes(resp); 
    }
    
    


    //Adding a note
    console.log("add")
    const addNote =async  (title,description,category)=>{
      const response = await fetch(`${host}/api/notes/add-note`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
       
        
        headers: {
          'Content-Type': 'application/json',
          'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjBiNWMwMzA0YWNjMjY5MjRkYTM5In0sImlhdCI6MTY0NTYxMTg2OH0.D6prkzpltS41CDWx3o-5MetqNJzhE_3avH6V87O3lFg'
        },
        body: JSON.stringify({title,description,category})
        
      });
      const added_note = await response.json()
      setNotes(notes.concat(added_note))
    }
    //Delete a note
    const deleteNote = async (id)=>{
    const newNote = notes.filter((note)=> {return note._id !== id})
    setNotes(newNote)

    //API CALL
    const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
     
      
      headers: {
        'Content-Type': 'application/json',
        'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjBiNWMwMzA0YWNjMjY5MjRkYTM5In0sImlhdCI6MTY0NTYxMTg2OH0.D6prkzpltS41CDWx3o-5MetqNJzhE_3avH6V87O3lFg'
      },
      
      
    });
    console.log( response.json) 
  }





  
    const updateNote = (id)=>{

    }
    
    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,updateNote,fetchNotes}}>
            { props.children }
        </noteContext.Provider>
    )
    }
export default NoteState;