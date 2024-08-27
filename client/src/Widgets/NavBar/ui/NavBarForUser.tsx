import { useAppSelector } from '../../../App/providers/store/store';
import cx from 'clsx';
import {  Group, Menu,  UnstyledButton,  Text, Divider, Box,  Burger,  Drawer, ScrollArea,  rem, Avatar, } from '@mantine/core';
import {IconLogout, IconChevronDown,} from '@tabler/icons-react';
import classes from '../HeaderMegaMenu.module.css';
import { IconUser } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../../../Shared/ThemeToggle/ThemeToggle';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import CloudMessage from './CloudMessage';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
};

function NavBarForUser(): JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const navigate = useNavigate();

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  return (
    // <Box>
    //   <header className={classes.header}>
    //     <Group justify="space-around" h="100%">
    //       <Group visibleFrom="sm">
            // <NavLink to={'/'} className={classes.link}>
            //   Главная
            // </NavLink>
            // <NavLink to={'/notes'} className={classes.link}>
            //   Заметки
            // </NavLink>
            // <NavLink to={'/questions'} className={classes.link}>
            //   Вопросы
            // </NavLink>
            // <NavLink to={'/quotes'} className={classes.link}>
            //   Цитаты
            // </NavLink>
            // <NavLink to={'/objectwriting'} className={classes.link}>
            //   Object Writing
            // </NavLink>
    //       </Group>
          
    //       <Group>
        //     <Menu
        //       width={260}
        //       position="bottom-end"
        //       transitionProps={{ transition: 'pop-top-right' }}
        //       onClose={() => setUserMenuOpened(false)}
        //       onOpen={() => setUserMenuOpened(true)}
        //       withinPortal
        //     >
        //       <Menu.Target>
        //         <UnstyledButton
        //           className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        //         >
        //           <Group gap={7}>
        //             <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
        //             <Text fw={500} size="sm" lh={1} mr={3}>
        //               {currentUser?.login}
        //             </Text>
        //             <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
        //           </Group>
        //         </UnstyledButton>
        //       </Menu.Target>
        //       <Menu.Dropdown>
        //         <Text size="lg" variant="gradient"
        // gradient={{ from: 'blue', to: 'cyan', deg: 90 }} ta='center'>{currentUser?.login}</Text>
        //         <Menu.Item onClick={() => navigate('/profile')} leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
        //           Личный Кабинет
        //         </Menu.Item>
        //         <Menu.Item
        //           onClick={() => navigate('/auth/logout')}
        //           color="red"
        //           leftSection={
        //             <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        //           }
        //         >
        //           Выйти
        //         </Menu.Item>
        //       </Menu.Dropdown>
        //     </Menu>

        //     <ThemeToggle />
    //       </Group>
    //     </Group>
      // </header>
    // </Box>
    <Box>
      <header className={classes.header}>
        <Group justify='space-around' h="100%">

          <Group h="100%" gap={0} visibleFrom="sm">
          <NavLink to={'/'} className={classes.link}>
              Главная
            </NavLink>
            <NavLink to={'/notes'} className={classes.link}>
              Заметки
            </NavLink>
            <NavLink to={'/questions'} className={classes.link}>
              Вопросы
              <CloudMessage/>
            </NavLink>
            <NavLink to={'/quotes'} className={classes.link}>
              Цитаты
              <CloudMessage/>
              </NavLink>
            <NavLink to={'/objectwriting'} className={classes.link}>
              Object Writing
              <CloudMessage/>
              </NavLink>
          </Group>

          <Group visibleFrom="sm">
          <Menu 
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {currentUser?.login}
                      </Text>
                      <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Text size="lg" variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }} ta='center'>{currentUser?.login}</Text>
                  <Menu.Item onClick={() => navigate('/profile')} leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                    Личный Кабинет
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => navigate('/auth/logout')}
                    color="red"
                    leftSection={
                      <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >
                    Выйти
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <ThemeToggle />
          </Group>
          <Burger mr={1000} opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
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
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <NavLink to={'/'} className={classes.link}>
              Главная
            </NavLink>
            <NavLink to={'/notes'} className={classes.link}>
              Заметки
              </NavLink>
            <NavLink to={'/questions'} className={classes.link}>
              Вопросы
              <CloudMessage/>
              </NavLink>
            <NavLink to={'/quotes'} className={classes.link}>
              Цитаты
              <CloudMessage/>
              </NavLink>
            <NavLink to={'/objectwriting'} className={classes.link}>
              Object Writing
              <CloudMessage/>
              </NavLink>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Menu
                zIndex={1000}
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {currentUser?.login}
                      </Text>
                      <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Text size="lg" variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }} ta='center'>{currentUser?.login}</Text>
                  <Menu.Item onClick={() => navigate('/profile')} leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                    Личный Кабинет
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => navigate('/auth/logout')}
                    color="red"
                    leftSection={
                      <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >
                    Выйти
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <ThemeToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default NavBarForUser;
