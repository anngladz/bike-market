import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../components/OAtuh';
import visibilityOn from '../assets/visibility-on.svg';
import visibilityOff from '../assets/visibility-off.svg';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Wrong user credentials!');
    }
  };

  return (
    <div className='mt-8 text-gray-800 flex flex-col items-center'>
      <header>
        <h1 className='text-xl font-bold mb-4'>Sign In</h1>
      </header>
      <main className='flex flex-col w-11/12 md:w-96'>
        <form className='flex flex-col w-11/12 md:w-96' onSubmit={onSubmit}>
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
            Sign In
          </button>
        </form>
        <OAuth />
        <Link
          to='/forgot-password'
          className='w-11/12 md:w-96 mt-4 p-3 font-bold rounded-md bg-gray-300 text-center'
        >
          Forgot Password
        </Link>
        <Link
          to='/sign-up'
          className='w-11/12 md:w-96 mt-4 p-3 font-bold rounded-md bg-gray-300 text-center'
        >
          Sign Up Instead
        </Link>
      </main>
    </div>
  );
}

export default SignIn;
