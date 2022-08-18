import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MarketItem({ listing, id }) {
  return (
    <Link to={`/${listing.type}/${id}`}>
      <div className='grid grid-cols-2 mb-4 bg-gray-50 rounded-md py-2 hover:bg-gray-200'>
        <div>
          <img
            className='h-24 md:h-36 mx-auto rounded-md'
            src={listing.imgUrls[0]}
            alt={listing.title}
          />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='font-bold'>{listing.title}</p>
          <p>
            <span className='font-medium'>Price:</span> {listing.price}$
          </p>
          <p>
            <span className='font-medium'>Location:</span> {listing.location}
          </p>
        </div>
      </div>
    </Link>
  );
}

MarketItem.propTypes = {
  listing: PropTypes.object,
  id: PropTypes.string,
};

export default MarketItem;
