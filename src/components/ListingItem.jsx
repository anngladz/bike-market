import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';
import { ReactComponent as EditIcon } from '../assets/edit.svg';

function ListingItem({ listing, id, onDelete, onEdit }) {
  return (
    <div className='relative'>
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
      {onDelete && (
        <DeleteIcon
          className='absolute bottom-4 right-4 cursor-pointer'
          fill='red'
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <EditIcon
          className='absolute top-4 right-4 cursor-pointer'
          onClick={() => onEdit(id)}
        />
      )}
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object,
  id: PropTypes.string,
  onDelete: PropTypes.func,
  onDEdit: PropTypes.func,
};

export default ListingItem;
