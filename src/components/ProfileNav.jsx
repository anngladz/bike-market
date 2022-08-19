import { getAuth } from 'firebase/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ProfileNav() {
  const auth = getAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <nav className='flex mb-8'>
      <Link
        to='/profile'
        className={`${
          pathMatchRoute('/profile') ? 'bg-amber-300' : 'bg-gray-50'
        } h-10 leading-10 px-2 font-bold rounded-md text-center`}
      >
        Profile
      </Link>
      <Link
        to='/profile/listings'
        className={`${
          pathMatchRoute('/profile/listings') ? 'bg-amber-300' : 'bg-gray-50'
        } h-10 leading-10 px-2 font-bold rounded-md text-center ml-4`}
      >
        Listings
      </Link>
      <Link
        to='/profile/messages'
        className={`${
          pathMatchRoute('/profile/messages') ? 'bg-amber-300' : 'bg-gray-50'
        } h-10 leading-10 px-2 font-bold rounded-md text-center ml-4`}
      >
        Messages
      </Link>
      <button
        className='h-10 px-2 font-bold rounded-md bg-amber-300 text-center ml-auto'
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default ProfileNav;
