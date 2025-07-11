import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';

export default function HomePage() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  return (

    <>
    

    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Shop Online in Our Store</h1>
      <p className="text-lg text-gray-600 mb-6">Find everything you need at the best prices.</p>
      <button 
        onClick={handleShopNow}
        className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg hover:bg-blue-700 transition"
      >
        Shop Now
      </button>
    </div>
    
    </>

  );
}