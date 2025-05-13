import React from 'react'

const userList = [
    {id:1, name:"Kamil", age: 25},
    {id:2, name:"Fazil", age: 22},
    {id:3, name:"Imran", age: 18}
]

const UserList = () => {
  return (
    <div>
        {userList.map((num)=>(
        <div key={num.id}>
            <h1>{num.name}</h1>
            <h1>{num.age}</h1>
        </div>
        ))}
    </div>
  )
}

export default UserList