import React from "react";
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <NoteState NoteState>
    <Router>
    <Navbar/>
    <Routes>        
          <Route  path="/"
          element = {<Home />}
          />
          <Route exact path="/about"
            element = { <About />}/> 
          
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
