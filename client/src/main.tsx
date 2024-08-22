import { createRoot } from 'react-dom/client';
import App from './App/App.tsx';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './App/providers/store/store.ts';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
