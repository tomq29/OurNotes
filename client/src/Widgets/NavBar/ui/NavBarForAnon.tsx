import { Group, Button, Box } from '@mantine/core';
import classes from '../HeaderMegaMenu.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../../../Shared/ThemeToggle/ThemeToggle';

function NavBarForAnon(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-around" h="100%">
          <Group h="100%" visibleFrom="sm">
            <NavLink to={'/'} className={classes.link}>
              Главная
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            <ThemeToggle />

            <Button onClick={() => navigate('/auth/login')} variant="default">
              Авторизация
            </Button>
            <Button onClick={() => navigate('/auth/reg')}>Регистрация</Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}

export default NavBarForAnon;
