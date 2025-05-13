import React from 'react'

const ProductInfo = () => {
    const productInfo ={
        pName : "Adidas",
        pPrice : "10$",
        pAvailibily : "In-Stock"
    }
  return (
    <div>
        <h1>Product Name : {productInfo.pName}</h1>
        <h1>Product Price : {productInfo.pPrice}</h1>
        <h1>Product Availibility : {productInfo.pAvailibily}</h1>
    </div>
  )
}

export default ProductInfo