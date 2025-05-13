import React from 'react'

const Greeting = () => {
    const heading = "This is Heading"
    const date = new Date().toLocaleString()

    

return(
   <div>
    <h1>{heading}</h1>
    <p>Date: {date}</p>
    
   </div>
  )
}

export default Greeting