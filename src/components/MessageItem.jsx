import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';

function MessageItem({ message, onDelete }) {
  return (
    <div className='relative bg-gray-50 rounded-md p-3 mb-4 overflow-auto'>
      <p>
        <span className='font-medium'>Author</span>: {message.author}
      </p>
      <p className='mt-2'>
        <span className='font-medium'>Title:</span> {message.title}
      </p>
      <p className='mt-2'>
        <span className='font-medium'>Message:</span> {message.text}
      </p>
      <DeleteIcon
        className='absolute top-4 right-4 cursor-pointer'
        fill='red'
        onClick={() => onDelete(message.id)}
      />
    </div>
  );
}

MessageItem.propTypes = {
  message: PropTypes.object,
  onDelete: PropTypes.func,
};

export default MessageItem;
