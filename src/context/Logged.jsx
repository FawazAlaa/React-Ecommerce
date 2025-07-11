import React, { createContext, useContext, useState } from 'react'

const LoggedStore=createContext(null);


export const Logged = ({children}) => {
    const[logged,setLogged]=useState(false)
  return (
    <LoggedStore.Provider value={{
        logged,
        setLogged
    }}>
        {children}
        </LoggedStore.Provider>
  )

}

  export const useLogged = () => {
    return useContext(LoggedStore)
  }
  
