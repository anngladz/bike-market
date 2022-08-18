import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  const images = listing.imgUrls.map((img) => ({
    src: img,
  }));

  return (
    <main className='w-11/12 lg:w-2/3 mx-auto mt-8 text-gray-800'>
      <div className='rounded-md'>
        <Carousel
          hasIndexBoard={false}
          canAutoPlay={false}
          images={images}
          style={{
            height: 450,
            background: '#f9fafb',
            borderRadius: '0.375rem',
          }}
        />
      </div>
      <div className='bg-gray-50 rounded-md mt-4 px-10 py-5'>
        <p className='font-bold text-center'>{listing.title}</p>
        <p className='my-8'>{listing.description}</p>
        <div className='grid grid-cols-2'>
          <div>
            <p>
              <span className='font-medium'>Condition: </span>
              {listing.condition}
            </p>
            <p>
              <span className='font-medium'>Price: </span>
              {listing.price}$
            </p>
            <p>
              <span className='font-medium'>Location: </span>
              {listing.location}
            </p>
          </div>
          <div>
            <p>
              <span className='font-medium'>Email: </span>
              {listing.email}
            </p>
            <p>
              <span className='font-medium'>Phone: </span>
              {listing.phone ? listing.phone : '-'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Listing;
