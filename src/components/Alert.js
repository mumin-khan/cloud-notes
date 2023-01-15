import React, { useState,useContext } from 'react'
import alertContext from '../context/alert/alertContext'

function Alert() {
    const alert_context = useContext(alertContext)
  const  {alert} = alert_context
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px'}}>
       {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show bar`} role="alert">
           <strong>{alert.type!=='danger'?`${capitalize(alert.type)}:`:''}</strong> {alert.msg} 
        </div>}
        </div>
    )
}

export default Alert