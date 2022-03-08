import React, { useState } from 'react'
import alertContext from './alertContext'

const AlertState = (props) => {
    const [alert,setAlert]=useState(null)
    const activate = (input)=>{
        setAlert({
            msg: input.msg,
            type: input.type
          })
          setTimeout(() => {
              setAlert(null);
          }, 1500);
      }
       


  return (
    <alertContext.Provider value={{activate,alert}}>
    { props.children }
    </alertContext.Provider>
  )
}

export default AlertState