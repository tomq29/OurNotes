import { Link, useNavigate } from 'react-router-dom';
import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  rem,
  Alert,
} from '@mantine/core';
import classes from './AunthenticationTitle.module.css';

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
    const id = notifications.show({
      loading: true,
      title: 'Ждемс..',
      message: 'Ща все будет',
      autoClose: false,
      withCloseButton: false,
    });
    dispatch(clearError());

    dispatch(loginUser(loginPass))
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
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          С возвращением!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          У вас еще аккаунта? <Link to="/auth/reg">Зарегистрируйтесь</Link>
        </Text>
        <form onSubmit={handleSubmit(authorizationUser)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="Введите email"
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

            <Group justify="space-between" mt="lg">
              <Anchor component="button" size="sm"></Anchor>
            </Group>
            <Button fullWidth mt="md" type="submit" size="md">
              Войти
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
}

export default LoginPage;
