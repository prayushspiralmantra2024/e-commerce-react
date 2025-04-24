import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
      const handleSignup = async (e) => {
        // e.preventDefault();
        try {
          const res = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
          const data = await res.json();
          dispatch(setUser(data)); // store globally
          console.log('User registered:', data);
        } catch (err) {
          console.error('Signup error:', err);
        }
      }; 
    return (
   <form action={handleSignup}>
   <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
   </form>
  )
}

export default SignUp