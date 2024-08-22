
import { NoteWithoutIDandFolderID } from '../type/NoteType';



import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { createlNote } from '../model/NotesSlice';

const schema = yup
  .object({
    title: yup
      .string()
      .required('Введите название')
      .min(3, 'Минимум 3 символа'),
    description: yup.string(),
    userID: yup.number().required(),
  })
  .required();

function AddNewCard({ setAddMode }: { setAddMode:React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {


  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: { userID: currentUser?.id },
  });

  async function addNewNote(newNote: NoteWithoutIDandFolderID): Promise<void> {
    try {
      dispatch(createlNote(newNote));
      setAddMode((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div style={{ width: '40%', margin: ' 0 auto' }}>
        <h4 className="text-center">Добавить новую заметку</h4>

        <form onSubmit={handleSubmit(addNewNote)}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Название
            </label>
            <input
              type="text"
              {...register('title')}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Название"
            />
            <p className="text-danger  text-center mt-3">
              {errors.title?.message}
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Описание
            </label>
            <input
              type="text"
              {...register('description')}
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Описание"
            />
            <p className="text-danger  text-center mt-3">
              {errors.description?.message}
            </p>
          </div>

          <button type="submit" className="btn btn-outline-success m-1">
            Добавить
          </button>

          <button
            onClick={() => setAddMode((prev) => !prev)}
            type="button"
            className="btn btn-outline-danger m-1"
          >
            Отменить
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNewCard;
