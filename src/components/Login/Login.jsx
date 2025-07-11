import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogged } from '../../context/Logged';

export default function Login() {
   const{logged,setLogged}=useLogged();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation:
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
 

 
    if (Object.keys(newErrors).length === 0) {
      console.log('Logging in with:', email, password);

      console.log('Login successful');
      navigate('/');
      setLogged(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-3'>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        className='d-block mb-1'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <small className="text-danger">{errors.email}</small>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        className='d-block mb-1'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <small className="text-danger">{errors.password}</small>}

      <div>
  <button className='btn btn-primary mt-2'>Log In</button>
      </div>


    
    </form>
  );
}
