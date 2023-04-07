import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticated } from '../features/user/userSlice';
import { Link } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(initialState);
  const { email, password } = inputs;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].some((item) => item.trim() === '')) {
      console.log('Enter all fields');
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      dispatch(authenticated());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className='font-semibold text-4xl text-center my-7'>Login</h1>
      <form className='container' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='email'
          className='form-input'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='form-input'
          value={password}
          onChange={handleInputChange}
        />

        <button className='btn btn-primary mt-5 w-full'>Submit</button>
      </form>
      <div className='text-center mt-2'>
        <p>or</p>
        <Link to='/register' className='underline'>
          Register
        </Link>
      </div>
    </>
  );
};
export default Login;
