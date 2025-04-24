import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLogin } from '../features/todo/authSlice';
const Login = () => {
    const dispatch = useDispatch();
  const [form, setForm] = useState({ username: '', password: '' });
 const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
 }
 const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        // If status is not 2xx, show the raw response
        const errorText = await response.text();
        console.error("Raw response:", errorText);
        throw new Error("Login failed: Invalid credentials or bad request");
      }
  
      const data = await response.json();
  
      if (data.token) {
        dispatch(setLogin({ token: data.token, username: form.username }));
        console.log('Logged in:', data);
      } else {
        alert('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Login failed. Check your username/password.');
    }
  };
  
  

  return (
    <form onSubmit={handleLogin}>
    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <button type="submit">Login</button>
  </form>
  )
}

export default Login