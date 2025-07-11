import React, { createContext, useContext, useState } from 'react'

const  CartContext= createContext(null);


export default function CartStore({children}) {
  const [cart,setCart]=useState([])
  return (
    <CartContext.Provider value={{
      cart,setCart
    }}>
      {children}

      </CartContext.Provider>
  )
}
export const useCart=()=>{
  return useContext(CartContext);
}
