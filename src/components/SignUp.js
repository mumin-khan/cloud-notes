import React, {useState,useContext}from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
const SignUp = () => {
    const alert_context = useContext(alertContext)
    const {activate} = alert_context
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",confirm_password:""}) 
    let history = useNavigate();
    
    const submit = async (e) => {
        e.preventDefault();
        if (credentials.password!==credentials.confirm_password){
          activate({type:'danger',msg:"password and confirm password are not same"})
          
        }
        else {const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            history("/");
            activate({type:'success',msg:"Signed up successfully"})

        }
        else{
          activate({type:'danger',msg:"Invalid Credentials"})

        }
      }
    }
    const change = (event)=>{
         setCredentials({...credentials,[event.target.name]:event.target.value})
     }
  return (
    <div className='container'>
        <form onSubmit={submit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" value={credentials.name} id="name" name="name" onChange={change} required minLength={5} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={change} required minLength={5} aria-describedby="emailHelp"/>
    <div id="email-" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name ="password" onChange={change} required minLength={5} value= {credentials.password} />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirm_password" name ="confirm_password" required minLength={5}  onChange={change} value= {credentials.confirm_password} />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp