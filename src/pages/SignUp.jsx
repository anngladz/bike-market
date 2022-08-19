import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import OAuth from '../components/OAtuh';
import visibilityOn from '../assets/visibility-on.svg';
import visibilityOff from '../assets/visibility-off.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className='mt-8 text-gray-800 flex flex-col items-center'>
      <header>
        <h1 className='text-xl font-bold mb-4'>Sign Up</h1>
      </header>
      <main className='flex flex-col w-11/12 md:w-96 items-center'>
        <form className='flex flex-col w-11/12 md:w-96' onSubmit={onSubmit}>
          <input
            className='p-3 rounded-md mt-4 focus:outline-gray-300'
            type='text'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            className='p-3 rounded-md mt-4 focus:outline-gray-300'
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='relative'>
            <input
              className='w-full p-3 rounded-md mt-4 focus:outline-gray-300'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            <img
              className='w-5 h-5 absolute top-8 right-5 cursor-pointer'
              src={showPassword ? visibilityOff : visibilityOn}
              alt='show password'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <button className='mt-4 p-3 font-bold rounded-md bg-amber-300 text-center'>
            Sign Up
          </button>
        </form>
        <OAuth />
        <Link
          to='/sign-in'
          className='w-11/12 md:w-96 mt-4 p-3 font-bold rounded-md bg-gray-300 text-center'
        >
          Sign In Instead
        </Link>
      </main>
    </div>
  );
}

export default SignUp;
