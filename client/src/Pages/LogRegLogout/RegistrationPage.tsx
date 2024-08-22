import { Link, useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
} from '@mantine/core';

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
import classes from './AunthenticationTitle.module.css';

const schema = yup
  .object({
    email: yup.string().email('Введите email').required('Введите email'),
    login: yup.string().required('Введите логин'),
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
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Добро пожаловать!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Уже есть аккаунт? <Link to="/auth/login"> Авторизируйтесь</Link>
        </Text>
        <form onSubmit={handleSubmit(registrationUser)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Логин"
              placeholder="Login"
              autoFocus
              required
              {...register('login')}
            />

            <p style={{ color: 'red' }}>{errors.login?.message}</p>

            <TextInput
              label="Email"
              onClick={() => dispatch(clearError())}
              placeholder="Email"
              required
              {...register('email')}
            />

            <p style={{ color: 'red' }}> {errors.email?.message}</p>

            <PasswordInput
              label="Пароль"
              placeholder="Введите пароль"
              required
              mt="md"
              {...register('password')}
            />

            <p style={{ color: 'red' }}> {errors.password?.message}</p>

            <PasswordInput
              label="Потвердите пароль"
              placeholder="Потвердите пароль"
              required
              mt="md"
              {...register('confirm')}
            />
            <p style={{ color: 'red' }}> {errors.confirm?.message}</p>

            <Button fullWidth mt="md" type="submit" size="md">
              Зарегистрироваться
            </Button>
          </Paper>
        </form>
        {error && <p className="text-danger  text-center mt-3">{error}</p>}

      </Container>
    </>
  );
}

export default RegistrationPage;
