import React,{useContext} from "react";
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AlertState from "./context/alert/alertState";
import Alert from "./components/Alert";
import alertContext from './context/alert/alertContext';


function App() {

  
  return (
    <>
    
    <NoteState NoteState>
    <AlertState AlertState>
    
    <Router>
    <Navbar/>
   <Alert/>
  
    <Routes>        
          <Route  path="/"
          element = {<Home />}
          />
          <Route exact path="/about"
            element = { <About />}/> 
          <Route exact path="/login"
            element = { <Login/>}/> 
          <Route exact path="/signup"
            element = { <SignUp/>}/> 
          
      </Routes>
    </Router>
    </AlertState>
    </NoteState>
   
   
   
    </>
  );
}

export default App;
