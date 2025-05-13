import React from 'react'

const Person = () => {
  return (
    <div>
        <PersonDetails
        name = "Fazil Husain Mirza"
        age = {22}
        />
    </div>
  )
}

const PersonDetails = ({name,age})=>{
return(
    <div>
        <h1>UserName:{name}</h1>
        <h1>Age:{age}</h1>
    </div>
    )
}
                   
export default Person