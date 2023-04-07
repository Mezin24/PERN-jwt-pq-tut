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
import { selectUser } from './features/user/userSlice';
import RootLayout from './components/layout/RootLayout';

const App = () => {
  const { isAuth } = useSelector(selectUser);
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
