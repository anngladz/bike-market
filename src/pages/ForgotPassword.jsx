import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className='mt-8 text-gray-800 flex flex-col items-center'>
      <header>
        <h1 className='text-xl font-bold mb-4'>Forgot Password</h1>
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

          <button className='mt-4 p-3 font-bold rounded-md bg-amber-300 text-center'>
            Send Reset Link
          </button>
        </form>

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

export default ForgotPassword;
