import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ProfileNav from '../components/ProfileNav';
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
      <ProfileNav />
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
      </main>
    </div>
  );
}

export default Profile;
