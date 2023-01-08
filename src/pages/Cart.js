import React from 'react'
import { useContext,useEffect,useState } from 'react'
import { CartContext } from '../CartContext'
import data from '../Data'

const Cart = () => {
 let total=0
 const {cart,setcart} = useContext(CartContext)
 const [products,setProducts] = useState([])
 const [priceFetched,togglePriceFetched]= useState(false);
 console.log(cart) 

useEffect(()=>{
  
  if (!cart.items){
    return ;
  }
  if(priceFetched){
    return ;
  }
  const id=Object.keys(cart.items)
  //  console.log("id..",id[0])
   console.log("hey_all",id)
   let v=[]
   let len=Object.keys(id).length
   let i=0
   for(i=0;i<len;i++){
      let p=data.filter((d)=>{
          return d._id==id[i]
      })
          v.push(p[0])
      }
      console.log("v",v)
      setProducts(v)
      togglePriceFetched(true)

      console.log("final",products)
  
},[cart])
const getQty=(productId)=>{
  return cart.items[productId];
}
const increnent = (productId)=>{
  const oldQty= cart.items[productId]
  const _cart= {...cart};
  _cart.items[productId]= oldQty+1
  _cart.totalItems +=1;
  setcart(_cart);
  
}
const decrement = (productId)=>{
  const oldQty= cart.items[productId]
  if(oldQty==1){
    return ;
  }
  const _cart= {...cart};
  _cart.items[productId]= oldQty-1
  _cart.totalItems -=1;
  setcart(_cart);
  
}
const getsum=(productId,productPrice)=>{
const sum = productPrice*getQty(productId)
total+=sum;
return sum
}
const handleDelete = (productId)=>{
  const _cart = {...cart}
  const qty = _cart.items[productId]
  delete _cart.items[productId]
  _cart.totalItems-=qty
  setcart(_cart);
  const updatedProductsList= products.filter((product)=>{
    return product._id !== productId
  })
  setProducts(updatedProductsList)
}
const handleOrderNow=()=>{
  window.alert("Order Placed Successfully")
  setProducts([]);
  setcart({});
}

  return (
    <>
      {products.length ?
      <div className='container mx-auto lg:w-1/2 w-full pb-24'>
        <h1 className='my-12 font-bold'>Cart items</h1>
        <ul>
          {
            products.map(product =>{
              return (          <li className='mb-12' key={product._id}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <img src={product.image} alt='' className='h-16'></img>
                  <span className='font-bold ml-4 w-48'>{product.name}</span>
                </div>
                <div>
                  <button className='bg-yellow-500 px-4 py-2 rounded-full leading-none'onClick={()=>{decrement(product._id)}}>-</button>
                  <b className='px-4'>{getQty(product._id,product.price)}</b>
                  <button className='bg-yellow-500 px-4 py-2 rounded-full leading-none' onClick={()=>{increnent(product._id)}}>+</button>
                </div>
                <span>${getsum(product._id,product.price)}</span>
                <button className='bg-red-500 px-4 py-4 py-2 rounded-full leading-none text-white'onClick={()=>{handleDelete(product._id)}}>Delete</button>
              </div>
            </li>

              )
            })
          }

        </ul>
        <hr className='my-6'></hr>
        <div className='text-right'>
          <b>Grand Total</b>: $ {total}
        </div>
        <div className='text-right mt-6'>
          <button className='bg-yellow-500 px-4 py-2 rounded-full leading-none' onClick={()=>{handleOrderNow()}}>Order Now</button>
        </div>
      </div>
      :
      <img src='images/empty-cart.png' alt='' className='mx-auto w-1/2 mt-12'></img>
        }
    </>
  )
}

export default Cart