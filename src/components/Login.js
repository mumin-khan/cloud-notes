import React, {useContext, useState}from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useNavigate();
    const alert_context = useContext(alertContext)
    const {activate} = alert_context
    
    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            activate({type:'success',msg:"Logged in successfully"})
            history("/");
   
            
        }
        else{
          activate({type:'danger',msg:"Failed to login"})
        }

    }
    const change = (event)=>{
         setCredentials({...credentials,[event.target.name]:event.target.value})
     }
    
  return (
    <div className='container'>
         

        <form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={change} aria-describedby="emailHelp"/>
    <div id="email-" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name ="password" onChange={change} value= {credentials.password} />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login