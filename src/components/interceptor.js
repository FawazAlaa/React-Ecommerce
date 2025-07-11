import axios from "axios";

export const AxiosInterceptor = axios.create ({
     baseURL: "https://dummyjson.com" 
})



//CartContext.jsx
 
// import { createContext, useContext, useState } from "react";
 
// export const CartContext = createContext(null);
 
// export const CartProvider = ({ children }) => {
//   const [cartAmount, setCartAmount] = useState(0);
//   return (
//     <CartContext.Provider value={{ cartAmount, setCartAmount }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
// export const useCart = () => {
//   return useContext(CartContext);
// };