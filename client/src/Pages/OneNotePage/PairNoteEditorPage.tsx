import React, { useEffect, useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Collaboration } from '@tiptap/extension-collaboration'; // Import collaboration extensions
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { useParams } from 'react-router-dom';
import {
  editNoteContent,
  getOneNote,
} from '../../Entities/Notes/model/OneNoteSlice';
import Spinner from '../../Shared/LoadingSpinner/Spinner';
import { Button, Container, Title } from '@mantine/core';
import { CollaborationCursor } from '../../Shared/Extentions/CollaborationCursor';

const defaultContent = `
  <p>Hi 👋, this is a collaborative document.</p>
`;
function PersonalNoteEditorPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { oneNote, loading } = useAppSelector((state) => state.oneNoteStore);
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  const currentUserForCollab = {
    name: currentUser?.login,
    color: '#E3F4F4',
  };

  const [status, setStatus] = useState('connecting');

  // Initialize Yjs document
  const ydoc = React.useMemo(() => new Y.Doc(), []);
  const provider = React.useMemo(
    () => new WebsocketProvider('ws://localhost:1234', oneNote.title, ydoc),
    [ydoc, oneNote.title]
  );

  // Editor setup
  const editor = useEditor({
    onCreate: ({ editor: currentEditor }) => {
      provider.on('synced', () => {
        if (currentEditor.isEmpty) {
          currentEditor.commands.setContent(defaultContent);
        }
      });
    },
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,

      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Collaboration.configure({ document: ydoc }), // Synchronize content
      CollaborationCursor.configure({
        provider: provider,
        // user: {
        //   name: currentUser?.login,
        //   color: currentUser?.colorID,
        // },
      }), // Synchronize cursors
    ],

    content: oneNote?.content,
  });

  // Fetch the note data when the component mounts
  useEffect(() => {
    dispatch(getOneNote(Number(id))).catch(console.log);
  }, [dispatch, id]);

  // Update the editor content when oneNote.content changes
  useEffect(() => {
    if (editor && oneNote.content) {
      editor.commands.setContent(oneNote.content);
    }
  }, [editor, oneNote.content]);

  useEffect(() => {
    // Update status changes
    const statusHandler = (event) => {
      setStatus(event.status);
    };

    provider.on('status', statusHandler);

    return () => {
      provider.off('status', statusHandler);
    };
  }, [provider]);

  useEffect(() => {
    if (editor && currentUser) {
      editor.chain().focus().updateUser(currentUserForCollab).run();
    }
  }, [editor, currentUser]);

  if (loading) {
    return <Spinner />;
  }

  function saveHandler() {
    if (editor) {
      const editedNote = { ...oneNote, content: editor.getJSON() };
      dispatch(editNoteContent(editedNote));
    }
  }

  return (
    <Container>
      <Title order={1} m={20}>
        {oneNote.title}
      </Title>
      <Title size="h4" m={10}>
        {oneNote.description}
      </Title>

      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <Button onClick={saveHandler} m={10}>
        Save
      </Button>
    </Container>
  );
}

export default PersonalNoteEditorPage;
