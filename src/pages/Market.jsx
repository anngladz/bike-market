import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';

function Market() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState('bike');
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const maxListings = 5;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', listingType),
          orderBy('timestamp', 'desc'),
          limit(maxListings)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings!');
      }
    };

    fetchListings();
  }, [listingType]);

  // Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', listingType),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(maxListings)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings!');
    }
  };

  return (
    <div className='w-11/12 lg:w-2/3 mx-auto mt-8 text-gray-800'>
      <div className='grid grid-cols-2'>
        <button
          className={`${
            listingType === 'bike' ? 'bg-amber-300' : 'bg-gray-50'
          } mt-4 mr-1 p-3 font-bold rounded-md hover:bg-amber-300`}
          onClick={() => setListingType('bike')}
        >
          Bikes
        </button>
        <button
          className={`${
            listingType === 'component' ? 'bg-amber-300' : 'bg-gray-50'
          } mt-4 ml-1 p-3 font-bold rounded-md hover:bg-amber-300`}
          onClick={() => setListingType('component')}
        >
          Components
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <main className='mt-8'>
          {listings.map((listing) => (
            <ListingItem
              listing={listing.data}
              id={listing.id}
              key={listing.id}
            />
          ))}
          {listings.length % maxListings === 0
            ? lastFetchedListing && (
                <p
                  className='bg-gray-50 rounded-md font-bold text-center p-3 cursor-pointer my-8'
                  onClick={onFetchMoreListings}
                >
                  Load More
                </p>
              )
            : ''}
        </main>
      ) : (
        <main className='mt-8'>
          <p className='text-center'>No listings</p>
        </main>
      )}
    </div>
  );
}

export default Market;
