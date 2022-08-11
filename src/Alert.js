import React, { useEffect } from 'react'

const Alert = ({type,msg,removeAlert}) => {
  useEffect(()=>{
     let timeOut=setTimeout(removeAlert,4000) //only setTimeout(removeAlert,3000) will work but to clear cache we can write this way
     return()=> clearTimeout(timeOut)
  })
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
