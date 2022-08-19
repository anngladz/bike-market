import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function SendMessage({ listing }) {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    author: auth.currentUser.displayName,
    title: listing.title,
    text: '',
    userRef: listing.userRef,
  });

  const { text } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, 'messages'), formDataCopy);
    toast.success('Message send!');
    setFormData((prevState) => ({
      ...prevState,
      text: '',
    }));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='mt-2'>
      <p className='font-medium'>Send message:</p>
      <form className='mt-2' onSubmit={onSubmit}>
        <textarea
          rows='6'
          id='text'
          onChange={onChange}
          value={text}
          className='bg-gray-50 w-full rounded-md p-3 focus:outline-gray-300'
          required
          maxLength='255'
        ></textarea>
        <button
          className='my-2 w-full font-bold rounded-md bg-amber-300 p-3'
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  );
}

SendMessage.propTypes = {
  listing: PropTypes.object,
};

export default SendMessage;
