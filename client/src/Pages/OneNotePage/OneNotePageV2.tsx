import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import Spinner from '../../Shared/LoadingSpinner/Spinner';

import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { getOneNote } from '../../Entities/Notes/model/OneNoteSlice';

function OneNotePageV2(): JSX.Element {
  const { id: noteId } = useParams(); // Get the note ID from the URL
  const [noteContent, setNoteContent] = useState('');
  const [socket, setSocket] = useState(null);

  // Get current user and their pair from the store
  const currentUser = useAppSelector((state) => state.currentUserStore.user);
  const currentUserPair = useAppSelector(
    (state) => state.currentUserStore.pair
  );

  const dispatch = useAppDispatch();
  const { oneNote, loading } = useAppSelector((state) => state.oneNoteStore);

  useEffect(() => {
    // Fetch the note details on component mount
    dispatch(getOneNote(Number(noteId))).catch(console.log);

    // Establish WebSocket connection
    const socketIo = io('/', {
      query: { noteId, userId: currentUser.id },
    });

    setSocket(socketIo);

    // Join the specific note room
    socketIo.emit('join-note', { noteId, userId: currentUser.id });

    // Listen for note content updates
    socketIo.on('note-update', (content) => {
      setNoteContent(content);
    });

    // Cleanup on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, [dispatch, noteId, currentUser.id]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value;
    setNoteContent(updatedContent);

    // Emit the updated content to the server
    if (socket) {
      socket.emit('note-edit', {
        noteId,
        content: updatedContent,
        userId: currentUser.id,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  // Check if the user has access (either the user or their pair can access the note)
  const userHasAccess =
    currentUserPair &&
    (currentUser.id === oneNote.userID ||
      currentUserPair.id === oneNote.pairID);

  if (!userHasAccess) {
    return <div>You do not have access to this note.</div>;
  }

  return (
    <div>
      <h2>Note {noteId}</h2>
      <textarea
        value={noteContent}
        onChange={handleNoteChange}
        placeholder="Edit your note here..."
        style={{ width: '100%', height: '300px' }}
      />
    </div>
  );
}

export default OneNotePageV2;
