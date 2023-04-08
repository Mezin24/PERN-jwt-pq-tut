import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import { authenticated, logout, selectUser } from './features/user/userSlice';
import RootLayout from './components/layout/RootLayout';
import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const { isAuth } = useSelector(selectUser);
  const dispatch = useDispatch();

  const isAuthenticated = async () => {
    if (!localStorage.token) return;
    try {
      const { data } = await axios('http://localhost:5000/auth/is-verify', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      if (data) {
        dispatch(authenticated());
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route
            path='register'
            element={isAuth ? <Navigate to='/dashboard' /> : <Register />}
          />
          <Route
            path='login'
            element={isAuth ? <Navigate to='/dashboard' /> : <Login />}
          />
          <Route
            path='dashboard'
            element={isAuth ? <Dashboard /> : <Navigate to='/login' />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
