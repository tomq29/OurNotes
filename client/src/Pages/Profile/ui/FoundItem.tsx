import { Container } from '@mantine/core';
import './profile.css';

type Props = {
  login: string;
  setUserForPair: (value: string) => void;
};

function FoundItem({ login, setUserForPair }: Props): JSX.Element {
  const handleClick = () => {
    setUserForPair(login);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setUserForPair(login);
    }
  };

  return (
    <Container mt={15}>
      <div
        className="findedItem2" // Updated CSS class name for consistency
        role="button" // Adds semantic meaning for accessibility
        tabIndex={0} // Makes the div focusable for keyboard interaction
        onClick={handleClick}
        onKeyDown={handleKeyDown} // Adds keyboard accessibility
      >
        {login}
      </div>
    </Container>
  );
}

export default FoundItem;
