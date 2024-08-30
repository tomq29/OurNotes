import { useEffect, useState } from 'react';
import AppRouter from './providers/router/AppRouter';
import NavBar from '../Widgets/NavBar/NavBar';
import { useAppDispatch, useAppSelector } from './providers/store/store';
import { refreshUser } from '../Entities/User/model/CurrentUserSlice';
import { Footer } from '../Widgets/Footer/Footer';
import { AppShell } from '@mantine/core';
import Spinner from '../Shared/LoadingSpinner/Spinner';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const loading = useAppSelector((state) => state.currentUserStore.loading);

  useEffect(() => {
    // Dispatch refreshUser and set isInitialized to true once completed
    const initializeUser = async () => {
      await dispatch(refreshUser());
      setIsInitialized(true); // Mark initialization as complete
    };
    
    initializeUser();
  }, [dispatch]);

  // Show loading spinner while initializing
  if (!isInitialized || loading) {
    return <Spinner />;
  }

  return (
    <>
      <AppShell header={{ height: 60 }} footer={{ height: 60 }} >
        <AppShell.Header>
          <NavBar />
        </AppShell.Header>
        <AppShell.Main>
          <AppRouter />
        </AppShell.Main>
        {/* <AppShell.Footer> */}
        <Footer />

        {/* </AppShell.Footer> */}
      </AppShell>
    </>
  );
}

export default App;
