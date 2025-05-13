import React from 'react'

const num = [1,2,3,8,5,6]


const List = () => {
  return (
    <>
    <div>
      {num.map((n)=>(
        <ul key={n}>
          <li>{n}</li>
        </ul>
      ))}
    </div>
    </>
  )
}

export default List