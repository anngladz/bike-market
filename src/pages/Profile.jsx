import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import edit from '../assets/edit.svg';
import done from '../assets/done.svg';

function Profile() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { name });
    } catch (error) {
      toast.error('Could not update profile!');
    }
  };

  return (
    <div className='w-11/12 md:w-2/3 mx-auto mt-8 text-gray-800'>
      <header className='flex'>
        <h1 className='leading-10 text-xl font-bold mb-8'>My Profile</h1>
        <button
          className='h-10 px-2 font-bold rounded-md bg-amber-300 text-center ml-auto'
          onClick={onLogout}
        >
          Logout
        </button>
      </header>
      <main>
        <form>
          <div className='p-3 rounded-md bg-gray-50 relative'>
            <label className='font-medium'>Name:</label>{' '}
            <input
              className={
                changeDetails
                  ? 'bg-gray-100 px-2 rounded-md focus:outline-gray-300'
                  : 'bg-gray-50'
              }
              type='text'
              id='name'
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <img
              className='w-5 h-5 absolute top-4 right-5 cursor-pointer'
              src={changeDetails ? done : edit}
              alt='edit'
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            />
          </div>
        </form>
        <p className='mt-4 p-3 rounded-md bg-gray-50'>
          <span className='font-medium'>E-mail:</span> {email}
        </p>

        <Link
          to='/create-listing'
          className='mt-8 p-3 rounded-md bg-amber-300 w-full block text-center font-bold'
        >
          Create listing
        </Link>
      </main>
    </div>
  );
}

export default Profile;
