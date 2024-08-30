import { Link, useNavigate } from 'react-router-dom';
import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
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
    email: yup
      .string()
      .email('Введите email')
      .required('Введите email')
      .lowercase(),
    login: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль'),
    confirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
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
              title: 'Успешно',
              message: 'Регистрация прошла успешно',
              icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
              loading: false,
              autoClose: 3000,
            });
            navigate('/');
          }

          if (action.meta.requestStatus === 'rejected' && error) {
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
              radius="xl"
              error={errors.login?.message}
              label="Логин"
              placeholder="Введите логин"
              autoFocus
              required
              {...register('login')}
            />

            <TextInput
              radius="xl"
              error={errors.email?.message}
              label="Email"
              onClick={() => dispatch(clearError())}
              placeholder="Введите email"
              required
              {...register('email')}
            />

            <PasswordInput
              radius="xl"
              error={errors.password?.message}
              label="Пароль"
              placeholder="Введите пароль"
              required
              mt="md"
              {...register('password')}
            />

            <PasswordInput
              radius="xl"
              error={errors.confirm?.message}
              label="Подтвердите пароль"
              placeholder="Подтвердите пароль"
              required
              mt="md"
              {...register('confirm')}
            />

            <Button fullWidth mt="md" type="submit" size="md">
              Зарегистрироваться
            </Button>
          </Paper>
          <p style={{ textAlign: 'center', fontSize: '12px', opacity: '0.5' }}>
            Ваш логин отображается для пользователей, которые приглашают вас в
            рабочее пространство. Продолжая, вы подтверждаете, что понимаете и
            соглашаетесь с{' '}
            <a href="/privacy-policy" target="_blank">
              Условиями
            </a>{' '}
            использования нашего сервиса.
          </p>
        </form>
      </Container>
    </>
  );
}

export default RegistrationPage;
