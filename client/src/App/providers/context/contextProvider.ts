import { createContext, Dispatch } from 'react';

type stateContext = {
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};

const initState: stateContext = {
  loading: true,
  setLoading: () => {},
};

export const AppContext = createContext(initState);
