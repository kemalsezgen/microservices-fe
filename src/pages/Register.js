import React, { useState } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailed } from '../redux/userSlice';

const Register = () => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [type, setType] = useState('1');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      //const response = await axios.post('/auth/register', { name, surname, username, type, email, password });
      dispatch(loginSuccess({name, surname, username, type, email, password}));
      navigate('/');
    } catch (error) {
      dispatch(loginFailed());
    }
  }

  return (
    <div className='login-container register-container'>
      <div className='welcomeMessage'>
        <h2>Register</h2>
      </div>
      <div className='loginForm'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='formInput'>
            <input value={name} type='text' name='name' placeholder='First Name' onChange={e => setName(e.target.value)} />
          </div>

          <div className='formInput'>
            <input value={surname} type='text' name='surname' placeholder='Last Name' onChange={e => setSurname(e.target.value)} />
          </div>

          <div className='formInput'>
            <input value={username} type='text' name='username' placeholder='Username' onChange={e => setUsername(e.target.value)} />
          </div>

          <div className='formInput'>
            <select value={type} name="type" onChange={e => setType(e.target.value)}>
              <option value="1">Member</option>
              <option value="2">Instructor</option>
            </select>
          </div>

          <div className='formInput'>
            <input value={email} type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
          </div>

          <div className='formInput'>
            <input value={password} type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
          </div>

          <div className='loginLower'>
            <button className='loginButton' type='submit'>Register</button>
            <div className='redirectText'>
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register