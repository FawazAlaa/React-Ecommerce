import React, { useEffect, useRef, useState } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartStore';

export default function Nav() {
  const { cart } = useCart();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const prevTotalItems = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotalItems.current) {
      const lastAdded = cart[cart.length - 1];
      setToastMessage(`${lastAdded.title} has been added to cart`);
      setShowToast(true);

      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
    prevTotalItems.current = totalItems;
  }, [cart, totalItems]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 sticky-top">
        <h1 className="navbar-brand">My Store</h1>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'link activelink' : 'link inactivelink'}>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/products" className={({ isActive }) => isActive ? 'link activelink' : 'link inactivelink'}>
              Products
            </NavLink>
          </li>

          <li className="nav-item position-relative">
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'link activelink position-relative' : 'link inactivelink position-relative'}>
              Cart
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/login" className={({ isActive }) => isActive ? 'link activelink' : 'link inactivelink'}>
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/register" className={({ isActive }) => isActive ? 'link activelink' : 'link inactivelink'}>
              Register
            </NavLink>
          </li>
        </ul>
      </nav>

      {showToast && (
        <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 2000 }}>
          <div className="toast show bg-success text-white">
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
