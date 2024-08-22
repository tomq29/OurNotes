import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { logEmailPassType } from '../../Entities/User/type/AuthTypes';
import {
  clearError,
  regUser,
} from '../../Entities/User/model/CurrentUserSlice';

const schema = yup
  .object({
    email: yup.string().email('Введите email').required('Введите email'),
    login: yup.string().required('Введите login'),
    password: yup.string().required('Введите пароль'),
    confirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Потвердите пароль'),
    colorID: yup.string().required('Выберите цвет'),
  })
  .required();

function RegistrationPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.currentUserStore.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const registrationUser = (logEmailPass: logEmailPassType) => {
    if (logEmailPass.confirm === logEmailPass.password) {
      dispatch(regUser(logEmailPass))
        .then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            navigate('/');
          }
        })
        .catch(console.log);
    }
  };

  return (
    <>
      <div style={{ width: '50%', margin: ' 0 auto' }}>
        <h2>Registration</h2>
        <form onSubmit={handleSubmit(registrationUser)}>
          <input
            type="text"
            {...register('login')}
            className={`form-control mb-3 ${errors.login ? 'is-invalid' : ''}`}
            placeholder="Login"
          />
          <p className="text-danger  text-center mt-3">
            {errors.login?.message}
          </p>
          <input
            type="email"
            onClick={() => dispatch(clearError())}
            {...register('email')}
            className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
          />
          <p className="text-danger  text-center mt-3">
            {errors.email?.message}
          </p>
          <input
            type="password"
            {...register('password')}
            className={`form-control mb-3 ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Пароль"
          />
          <p className="text-danger  text-center mt-3">
            {errors.password?.message}
          </p>
          <input
            type="password"
            {...register('confirm')}
            className={`form-control mb-3 ${
              errors.confirm ? 'is-invalid' : ''
            }`}
            placeholder="Подтвердите пароль"
          />
          <p className="text-danger  text-center mt-3">
            {errors.confirm?.message}
          </p>
          <select
            {...register('colorID')}
            className={`form-control mb-3 ${
              errors.colorID ? 'is-invalid' : ''
            }`}
          >
            <option value="">Выберите цвет</option>
            <option value={1}>Красный</option>
            <option value={2}>Зелёный</option>
            <option value={3}>Синий</option>
          </select>
          <p className="text-danger text-center mt-3">
            {errors.colorID?.message}
          </p>
          <button type="submit" className="btn btn-outline-success">
            Зарегистрироваться
          </button>
        </form>
        {error && <p className="text-danger  text-center mt-3">{error}</p>}
      </div>
    </>
  );
}

export default RegistrationPage;
