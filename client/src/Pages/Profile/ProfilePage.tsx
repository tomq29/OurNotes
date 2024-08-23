import { useAppSelector } from '../../App/providers/store/store';
import { Button, Container } from '@mantine/core';
import ModalAddPair from './ui/ModalAddPair';

function ProfilePage(): JSX.Element {
  const currentUser = useAppSelector((store) => store.currentUserStore.user);

  return (
    <Container className="profileContainer">
      <h2>ProfilePage</h2>
      <p>
        <strong>Ваш логин: </strong> {currentUser?.login}
      </p>
      <p>
        <strong>Ваш email: </strong> {currentUser?.email}
      </p>
      <ModalAddPair />
      <br />
      <Button style={{ marginTop: '20px', marginBottom: '20px' }}>
        Входящие заявки
      </Button>
    </Container>
  );
}

export default ProfilePage;
