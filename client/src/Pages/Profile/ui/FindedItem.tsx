import React from 'react';

import './profile.css';

type Props = {
  login: string;
  setUserForPair: (value: string) => void;
};
function FindedItem({ login, setUserForPair }: Props): JSX.Element {
  return (
    <div
      key={login}
      className="findedItem"
      onClick={() => setUserForPair(login)}
    >
      {login}
    </div>
  );
}

export default FindedItem;
