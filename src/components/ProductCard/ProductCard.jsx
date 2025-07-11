import React from 'react';
import './ProductCard.css';
import { useCart } from '../../context/CartStore';

export default function ProductCard({ product }) {
  const { cart, setCart } = useCart();

  // Check if the product is already in the cart
  const existingCartItem = cart.find(item => item.id === product.id);
  const quantityInCart = existingCartItem ? existingCartItem.quantity : 0;

  const addOne = () => {
    if (existingCartItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeOne = () => {
    if (!existingCartItem) return;

    if (existingCartItem.quantity === 1) {
      // Remove item entirely
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);
    }
  };

  return (
    <div className="product-card-container">
      <div className="product-card" key={product.id}>
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>

        <div>
          {[1, 2, 3, 4, 5].map((num, index) => (
            <i
              key={index}
              className={`bi ${index < Math.floor(product.rating || 0) ? 'bi-star-fill' : 'bi-star'} me-1`}
              style={{ color: 'gold' }}
            ></i>
          ))}
        </div>

        <p>{product.price}$</p>
        <p><strong>Stock: </strong>{product.stock}</p>

        {/* Toggle Button / Counter */}
        {quantityInCart === 0 ? (
          <button onClick={addOne} className="btn btn-primary">Add To Cart</button>
        ) : (
          <div className='d-flex gap-2 justify-content-center align-items-center mb-2'>
            <button onClick={addOne} disabled={quantityInCart >= product.stock}>+</button>
            <p className='m-0'>{quantityInCart}</p>
            <button onClick={removeOne}>-</button>
          </div>
        )}
      </div>
    </div>
  );
}
