import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as BikeIcon } from '../assets/bike.svg';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <nav className='bg-gray-800 text-slate-100'>
      <div className='max-w-7xl h-20 mx-auto flex justify-center md:justify-start'>
        <BikeIcon
          fill='#fff'
          width='50px'
          height='50px'
          className='my-auto mr-8'
        />

        <button
          className={`${
            pathMatchRoute('/') ? 'bg-gray-900' : ''
          } flex my-auto mx-2 p-3 rounded-md font-bold  hover:text-amber-300`}
          onClick={() => navigate('/')}
        >
          Market
        </button>
        <button
          className={`${
            pathMatchRoute('/profile') ? 'bg-gray-900' : ''
          } flex my-auto mx-2 p-3 rounded-md font-bold  hover:text-amber-300`}
          onClick={() => navigate('/profile')}
        >
          Profile
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
