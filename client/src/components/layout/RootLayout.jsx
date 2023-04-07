import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='max-w-3xl w-11/12 mx-auto'>
      <Outlet />
    </div>
  );
};
export default RootLayout;
