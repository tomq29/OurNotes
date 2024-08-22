import { Link, useNavigate } from 'react-router-dom';
import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import { IconInfoCircle } from '@tabler/icons-react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
  rem,
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
  const icon = <IconInfoCircle />;
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
      const id = notifications.show({
        loading: true,
        title: 'Ждемс..',
        message: 'Ща все будет',
        autoClose: false,
        withCloseButton: false,
      });
      dispatch(regUser(logEmailPass))
        .then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            notifications.update({
              id,
              color: 'teal',
              title: '',
              message: 'Авторизация прошла успешно',
              icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
              loading: false,
              autoClose: 3000,
            });
            navigate('/');
          }

          if (action.meta.requestStatus === 'rejected') {
            notifications.update({
              id,
              color: 'red',
              title: 'Ошибка',
              message: error,
              icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
              loading: false,
              autoClose: 3000,
            });
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

            {errors.login && (
              <Alert variant="light" color="red" radius="md">
                {errors.login?.message}
              </Alert>
            )}

            <TextInput
              label="Email"
              onClick={() => dispatch(clearError())}
              placeholder="Email"
              required
              {...register('email')}
            />

            {errors.email && (
              <Alert variant="light" color="red" radius="md">
                {errors.email?.message}
              </Alert>
            )}

            <PasswordInput
              label="Пароль"
              placeholder="Введите пароль"
              required
              mt="md"
              {...register('password')}
            />

            {errors.password && (
              <Alert variant="light" color="red" radius="md">
                {errors.password?.message}
              </Alert>
            )}

            <PasswordInput
              label="Потвердите пароль"
              placeholder="Потвердите пароль"
              required
              mt="md"
              {...register('confirm')}
            />

            {errors.confirm && (
              <Alert variant="light" color="red" radius="md">
                {errors.confirm?.message}
              </Alert>
            )}

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
