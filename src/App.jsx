import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProductList from './components/ProductList/ProductList'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './components/Home/Home'
import Register from './components/Register/Register'
import './App.css'
import CartStore from './context/CartStore'
import Cart from './components/Cart/Cart'
import { Logged } from './context/Logged'
import { Authentication } from './Authentication/Authentication'

function App() {


  return (
    <>
      <CartStore>
        <Logged>
          <Nav></Nav>
          <main >
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />

              <Route path="/Cart" element={
                <Authentication>
                  <Cart />
                </Authentication>} />

              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
            </Routes>
          </main>
        </Logged>
        {/* <ProductList /> */}
        <Footer />
      </CartStore>



    </>
  )
}

export default App
