import React from 'react'


const Item = (props) => {
    const itemName = props.name;
    const forImage = props.src;
  return (
    <div>
        <h1>Item Name: {itemName}</h1>
        <img src={forImage} alt="" />
       
    </div>
  )
}

export default Item