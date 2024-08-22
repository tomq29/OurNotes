import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginPassType } from '../../Entities/User/type/AuthTypes';
import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import {
  clearError,
  loginUser,
} from '../../Entities/User/model/CurrentUserSlice';

const schema = yup
  .object({
    email: yup.string().email('Введите email').required('Введите email'),
    password: yup.string().required('Введите пароль'),
  })
  .required();

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.currentUserStore.error);

  const navigate = useNavigate();

  const authorizationUser = async (loginPass: loginPassType) => {
    dispatch(clearError());

    dispatch(loginUser(loginPass))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/');
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <div style={{ width: '50%', margin: ' 0 auto' }}>
        <h2>Authorization</h2>
        <form onSubmit={handleSubmit(authorizationUser)}>
          <input
            type="text"
            {...register('email')}
            className="form-control mb-3"
            placeholder="Email"
          />
          <p className="text-danger  text-center mt-3">
            {errors.email?.message}
          </p>
          <input
            type="password"
            {...register('password')}
            className="form-control mb-3"
            placeholder="Пароль"
          />
          <p className="text-danger  text-center mt-3">
            {errors.password?.message}
          </p>
          <button type="submit" className="btn btn-outline-success">
            Войти
          </button>

          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
