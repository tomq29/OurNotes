import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Flex,
} from '@mantine/core';
import classes from '../HeaderMegaMenu.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../../../Shared/ThemeToggle/ThemeToggle';
import { useDisclosure } from '@mantine/hooks';

function NavBarForAnon(): JSX.Element {
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-around" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to={'/'} className={classes.link}>
              Главная
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            <Button onClick={() => navigate('/auth/login')} variant="default">
              Авторизация
            </Button>
            <Button onClick={() => navigate('/auth/reg')}>Регистрация</Button>
            <ThemeToggle />
          </Group>
          <Burger
            mr={1000}
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Навигация"
        hiddenFrom="sm"
        zIndex={1000}
      >
        <ScrollArea h={`calc(100vh - ${rem(70)})`} mx="-md">
          <Divider my="sm" />

          <NavLink to={'/'} className={classes.link}>
            Главная
          </NavLink>
          <ThemeToggle />
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Flex direction={'column'}>
              <Button onClick={() => navigate('/auth/login')} variant="default">
                Авторизация
              </Button>
              <Button mt={10} onClick={() => navigate('/auth/reg')}>
                Регистрация
              </Button>
            </Flex>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default NavBarForAnon;
