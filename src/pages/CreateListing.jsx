import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../components/Spinner';

function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'bike',
    title: '',
    description: '',
    location: '',
    price: '0',
    images: {},
    email: '',
    phone: '',
    condition: 'New',
  });

  const {
    type,
    title,
    description,
    location,
    price,
    images,
    email,
    phone,
    condition,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (images.length > 6) {
      setLoading(false);
      toast.error('Max 6 images!');
      return;
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error('Images not uploaded!');
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    setLoading(false);
    toast.success('Listing added!');
    navigate(`/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='w-11/12 md:w-2/3 mx-auto mt-8 text-gray-800'>
      <header>
        <h1 className='leading-10 text-xl font-bold mb-8'>Create listing</h1>
      </header>
      <main>
        <form className='flex flex-col' onSubmit={onSubmit}>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Title</label>
            <input
              className='w-full rounded-md px-3 py-1 focus:outline-gray-300'
              type='text'
              id='title'
              value={title}
              onChange={onMutate}
              minLength='10'
              maxLength='48'
              required
            />
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Type</label>
            <div>
              <button
                className={`${
                  type === 'bike' ? 'bg-amber-300' : 'bg-gray-200'
                } px-3 py-1 rounded-md mr-2`}
                type='button'
                id='type'
                value='bike'
                onClick={onMutate}
              >
                Bike
              </button>
              <button
                className={`${
                  type === 'component' ? 'bg-amber-300' : 'bg-gray-200'
                } px-3 py-1 rounded-md`}
                type='button'
                id='type'
                value='component'
                onClick={onMutate}
              >
                Component
              </button>
            </div>
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Condition</label>
            <div>
              <button
                className={`${
                  condition === 'New' ? 'bg-amber-300' : 'bg-gray-200'
                } px-3 py-1 rounded-md mr-2`}
                type='button'
                id='condition'
                value='New'
                onClick={onMutate}
              >
                New
              </button>
              <button
                className={`${
                  condition === 'Used' ? 'bg-amber-300' : 'bg-gray-200'
                } px-3 py-1 rounded-md`}
                type='button'
                id='condition'
                value='Used'
                onClick={onMutate}
              >
                Used
              </button>
            </div>
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Description</label>
            <input
              className='w-full rounded-md px-3 py-1 focus:outline-gray-300'
              type='text'
              id='description'
              value={description}
              onChange={onMutate}
              minLength='48'
              maxLength='255'
              rows='4'
              required
            />
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Location</label>
            <input
              className='w-full rounded-md px-3 py-1 focus:outline-gray-300'
              type='text'
              id='location'
              value={location}
              onChange={onMutate}
              minLength='3'
              maxLength='24'
              required
            />
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Price</label>
            <input
              className='w-full rounded-md px-3 py-1 focus:outline-gray-300'
              type='number'
              id='price'
              value={price}
              onChange={onMutate}
              min='1'
              required
            />
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Email</label>
            <input
              className='w-full rounded-md px-3 py-1 focus:outline-gray-300'
              type='email'
              id='email'
              value={email}
              onChange={onMutate}
              required
            />
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Phone</label>
            <input
              className='w-full rounded-md px-3 py-1 focus:outline-gray-300'
              type='phone'
              id='phone'
              value={phone}
              onChange={onMutate}
            />
          </div>
          <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-[100px_1fr] items-center'>
            <label className='font-medium mr-4'>Images</label>
            <div>
              <input
                type='file'
                id='images'
                onChange={onMutate}
                max='6'
                accept='.jpg,.png,.jpeg'
                multiple
                required
              />
              <p>(Max 6 photos, 2MB is max file size)</p>
            </div>
          </div>

          <button
            type='submit'
            className='my-4 rounded-md p-3 font-bold bg-amber-300'
          >
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
