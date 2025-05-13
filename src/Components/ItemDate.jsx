import React from 'react'

const ItemDate = (d) => {
  return (
    <div>
        <span>{d.date}/</span>
        <span>{d.day}/</span>
        <span>{d.year}</span>
    </div>
  )
}

export default ItemDate