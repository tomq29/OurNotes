import { useEffect } from 'react';
import AppRouter from './providers/router/AppRouter';
import NavBar from '../Widgets/NavBar/NavBar';
import { useAppDispatch, useAppSelector } from './providers/store/store';
import { refreshUser } from '../Entities/User/model/CurrentUserSlice';
import { Footer } from '../Widgets/Footer/Footer';
import { AppShell } from '@mantine/core';
import Spinner from '../Shared/LoadingSpinner/Spinner';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.currentUserStore.loading);

  useEffect(() => {
    dispatch(refreshUser()).catch(console.log);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
      <AppShell.Header>
        <NavBar />
      </AppShell.Header>
      <AppShell.Main>
        <AppRouter />
      </AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
