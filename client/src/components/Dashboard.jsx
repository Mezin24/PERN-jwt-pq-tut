import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../features/user/userSlice';

const Dashboard = () => {
  const [name, setName] = useState(null);
  const dispatch = useDispatch();

  const getUser = useCallback(async (token) => {
    try {
      const { data } = await axios('http://localhost:5000/dashboard', {
        headers: {
          token,
        },
      });
      setName(data.user_name);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getUser(token);
  }, []);

  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
  return (
    <>
      {name ? (
        <h1 className='font-semibold text-4xl text-center my-7'>
          Welcome, {name}
        </h1>
      ) : (
        <h1 className='text-center mt-10'>Loading...</h1>
      )}
      <button className='btn btn-primary' onClick={onLogout}>
        Logout
      </button>
    </>
  );
};
export default Dashboard;
