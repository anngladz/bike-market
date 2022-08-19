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
      <div className='w-11/12 lg:w-2/3 h-20 mx-auto flex justify-center md:justify-start'>
        <button className='flex' onClick={() => navigate('/')}>
          <BikeIcon
            fill='#fff'
            width='50px'
            height='50px'
            className='my-auto mr-8'
          />
          <h1 className='my-auto mr-8 uppercase font-medium text-xl hidden md:block'>
            <span className='text-amber-300 font-bold'>Bike</span> Market
          </h1>
        </button>
        <button
          className={`${
            pathMatchRoute('/') ? 'bg-gray-700 text-amber-300' : ''
          } flex my-auto mx-2 p-3 rounded-md font-bold  hover:text-amber-300`}
          onClick={() => navigate('/')}
        >
          Market
        </button>
        <button
          className={`${
            pathMatchRoute('/profile') ||
            pathMatchRoute('/profile/listings') ||
            pathMatchRoute('/profile/messages') ||
            pathMatchRoute('/sign-in') ||
            pathMatchRoute('/sign-up') ||
            pathMatchRoute('/forgot-password')
              ? 'bg-gray-700 text-amber-300'
              : ''
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
