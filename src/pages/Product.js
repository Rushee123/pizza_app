// import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'

import { useContext, useState } from 'react'
const Product = (props) => {
const [isAdding,setIsAdding]=useState(false);
const { cart,setcart }=useContext(CartContext)


  const product = props.product
  const addTocart = (event, product) => {
    event.preventDefault();
    console.log(product);
    let _cart = {...cart}
    if (!_cart.items) {
        _cart.items={}
    }
    if (_cart.items[product._id]){
        _cart.items[product._id]+=1;
      }
    else{
      _cart.items[product._id]=1;
    }
    if(!_cart.totalItems){
      _cart.totalItems = 0;
    }
    _cart.totalItems+=1;
    setcart(_cart)
    setIsAdding(true)
    setTimeout(() => {
      setIsAdding(false)
    }, 1000);
    
  }



  return (
    <>
      <Link to={`/products/${product._id}`}>
        <div>
          <img src={product.image} alt='pizza'></img>
          <div className='text-center'>
            <h2 className='text-lg font-bold py-2'>{product.name}</h2>
            <span className='bg-gray-200bpy-1 rounded-full text-sm px-4'>{product.size}</span>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <span>$ {product.price}</span>
            <button className={`${isAdding ? 'bg-green-500':'bg-yellow-500'}  py-1 px-4 rounded-full font-bold`} disabled={isAdding} onClick={(e) => { addTocart(e, product) }}>ADD{isAdding ? 'ED':''}</button>
          </div>
        </div>

      </Link>
    </>
  )
}

export default Product