import './css/stylesForCollab.scss';
import React, { useEffect } from 'react';
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
import { Button, Container, rem, Title } from '@mantine/core';

import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Placeholder from '@tiptap/extension-placeholder';

import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { getColorByID } from '../../utils/getColorByID/getColorByID';

function PersonalNoteEditorPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { oneNote, loading } = useAppSelector((state) => state.oneNoteStore);
  const currentUser = useAppSelector((state) => state.currentUserStore.user);



  // Initialize Yjs document
  const ydoc = React.useMemo(() => new Y.Doc(), []);
  const provider = React.useMemo(
    () => new WebsocketProvider('ws://87.228.24.113:1234', `note-${id}`, ydoc),
    [ydoc, id]
  );

  // Editor setup
  const editor = useEditor({
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
        user: {
          name: currentUser?.login,
          color: getColorByID(currentUser?.colorID),
        },
      }),
      Placeholder.configure({
        placeholder: 'Как ты? Как себя чувствуешь?',
      }),
      // Synchronize cursors
    ],

    // content: oneNote?.content,
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



  if (loading) {
    return <Spinner />;
  }

  function saveHandler() {
    const id = notifications.show({
      loading: true,
      title: 'Ждемс..',
      message: 'Ща все будет',
      autoClose: false,
      withCloseButton: false,
    });

    if (editor) {
      const editedNote = { ...oneNote, content: editor.getJSON() };
      dispatch(editNoteContent(editedNote)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          notifications.update({
            id,
            color: 'teal',
            title: 'Успешно',
            message: 'Все сохранилось',
            icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            loading: false,
            autoClose: 3000,
          });
        }
      });
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
        Сохранить
      </Button>
    </Container>
  );
}

export default PersonalNoteEditorPage;
