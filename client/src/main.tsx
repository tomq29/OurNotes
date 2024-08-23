import { createRoot } from 'react-dom/client';
import App from './App/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './App/providers/store/store.ts';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import { Notifications } from '@mantine/notifications';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  </Provider>
);
