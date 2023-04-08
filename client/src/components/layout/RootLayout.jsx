import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
  return (
    <>
      <div className='max-w-3xl w-11/12 mx-auto'>
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};
export default RootLayout;
