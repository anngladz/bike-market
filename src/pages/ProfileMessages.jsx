import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ProfileNav from '../components/ProfileNav';
import MessageItem from '../components/MessageItem';

function ProfileMessages() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const fetchUserMessages = async () => {
      const messagesRef = collection(db, 'messages');

      const q = query(
        messagesRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnap = await getDocs(q);

      let messages = [];

      querySnap.forEach((doc) => {
        return messages.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setMessages(messages);
      setLoading(false);
    };

    fetchUserMessages();
  }, [auth.currentUser.uid]);

  const onDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteDoc(doc(db, 'messages', messageId));
      const updatedMessages = messages.filter(
        (message) => message.id !== messageId
      );
      setMessages(updatedMessages);
      toast.success('Successfully deleted message!');
    }
  };

  return (
    <div className='w-11/12 md:w-2/3 mx-auto mt-8 text-gray-800'>
      <ProfileNav />
      <main>
        {!loading && messages?.length > 0 && (
          <>
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message.data}
                onDelete={() => onDelete(message.id)}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
}

export default ProfileMessages;
