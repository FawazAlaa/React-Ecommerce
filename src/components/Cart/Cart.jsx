import React, { useEffect } from 'react';
import { useCart } from '../../context/CartStore';
import './Cart.css';

export default function Cart() {
  const { cart, setCart } = useCart();

  useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  const addOne = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const removeOne = (id) => {
    const updatedCart = cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='container my-5'>
      <h2 className='mb-4'>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className='alert alert-info text-center'>Your cart is empty</div>
      ) : (
        <div className='row g-4'>
          {cart.map((item) => (
            <div key={item.id} className='col-md-4'>
              <div className='card h-100 shadow-sm'>
                <img src={item.thumbnail} alt={item.title} className='card-img-top' style={{ height: '200px', objectFit: 'cover' }} />

                <div className='card-body d-flex flex-column'>
                  <h5 className='card-title'>{item.title}</h5>
                  <p className='card-text'>{item.description?.substring(0, 60)}...</p>

                  <p className='mb-2'>
                    <strong>Price:</strong> ${item.price}
                  </p>

                  <p className='mb-2'>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>

                  <div className='d-flex gap-2 align-items-center mb-2'>
                    <button className='btn btn-outline-primary btn-sm' onClick={() => addOne(item.id)}>+1</button>
                    <button className='btn btn-outline-danger btn-sm' onClick={() => removeOne(item.id)}>-1</button>
                  </div>

                  <p className='mt-auto fw-bold text-success'>
                    Total: ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className='mt-4 text-end'>
          <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
          <button className='btn btn-success mt-2'>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
