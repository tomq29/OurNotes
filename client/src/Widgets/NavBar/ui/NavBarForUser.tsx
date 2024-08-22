import { useAppSelector } from '../../../App/providers/store/store';

import { Group, Button, Box, Text } from '@mantine/core';

import classes from '../HeaderMegaMenu.module.css';
import { IconUser } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../../../Shared/ThemeToggle/ThemeToggle';

function NavBarForUser(): JSX.Element {
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-around" h="100%">
          <Group h="100%" visibleFrom="sm">
            <NavLink to={'/'} className={classes.link}>
              Home
            </NavLink>
            <NavLink to={'/notes'} className={classes.link}>
              Заметки
            </NavLink>
            <NavLink to={'/questions'} className={classes.link}>
              Вопросы
            </NavLink>
            <NavLink to={'/quotes'} className={classes.link}>
              Цитаты
            </NavLink>
            <NavLink to={'/objectwriting'} className={classes.link}>
              Object Writing
            </NavLink>
          </Group>
          <Group h="100%" visibleFrom="sm">
            <IconUser />
            <Text size="md" mx="xs">
              Добрый день, {currentUser?.login}
            </Text>
          </Group>

          <Group visibleFrom="sm">
            <ThemeToggle />

            <Button onClick={() => navigate('/auth/logout')} variant="light">
              Logout
            </Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}

export default NavBarForUser;
