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
import { CollaborationCursor } from '../../Shared/Extentions/CollaborationCursor';
import Placeholder from '@tiptap/extension-placeholder';
import { ColorID } from '../../Entities/Colors/type/ColorType';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

const defaultContent = `
  <p>Hi 👋, this is a collaborative document.</p>
`;

// Utility function to get color value by colorID
function getColorByID(colorID: ColorID | undefined) {
  const colors = [
    { id: 1, color: '#D3D3D3', title: 'Светло-серый' },
    { id: 2, color: '#FFCCCC', title: 'Светло-красный' },
    { id: 3, color: '#CCFFCC', title: 'Светло-зеленый' },
    { id: 4, color: '#CCCCFF', title: 'Светло-синий' },
    { id: 5, color: '#FFFACD', title: 'Лимонный' },
    { id: 6, color: '#FFD700', title: 'Золотой' },
    { id: 7, color: '#FF69B4', title: 'Ярко-розовый' },
    { id: 8, color: '#FFB6C1', title: 'Светло-розовый' },
    { id: 9, color: '#E6E6FA', title: 'Лаванда' },
    { id: 10, color: '#B0E0E6', title: 'Пудровый синий' },
    { id: 11, color: '#F0E68C', title: 'Хаки' },
    { id: 12, color: '#FFE4B5', title: 'Мокасин' },
    { id: 13, color: '#D8BFD8', title: 'Тис' },
    { id: 14, color: '#C0C0C0', title: 'Серебряный' },
    { id: 15, color: '#87CEEB', title: 'Небесно-голубой' },
    { id: 16, color: '#FFDAB9', title: 'Персиковый' },
    { id: 17, color: '#FAFAD2', title: 'Светло-золотистый' },
    { id: 18, color: '#FFEFD5', title: 'Папайя' },
    { id: 19, color: '#FFE4E1', title: 'Туманный розовый' },
    { id: 20, color: '#F5DEB3', title: 'Пшеница' },
    { id: 21, color: '#FFF5EE', title: 'Ракушка' },
    { id: 22, color: '#F0FFF0', title: 'Медовая роса' },
    { id: 23, color: '#FAEBD7', title: 'Антикварный белый' },
    { id: 24, color: '#FDF5E6', title: 'Старое кружево' },
    { id: 25, color: '#FFFAFA', title: 'Лапушка' },
    { id: 26, color: '#2C7ED6', title: 'Синий' },
  ];

  const color = colors.find((c) => c.id === colorID);
  return color ? color.color : '#FFFFFF'; // Return a default color if not found
}

function PersonalNoteEditorPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { oneNote, loading } = useAppSelector((state) => state.oneNoteStore);
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  // const [status, setStatus] = useState('connecting');

  // Initialize Yjs document
  const ydoc = React.useMemo(() => new Y.Doc(), []);
  const provider = React.useMemo(
    () => new WebsocketProvider('ws://localhost:1234', `note-${id}`, ydoc),
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

  // useEffect(() => {
  //   const statusHandler = (event) => {
  //     setStatus(event.status);
  //   };

  //   provider.on('status', statusHandler);

  //   return () => {
  //     provider.off('status', statusHandler);
  //   };
  // }, [provider, editor]);

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
