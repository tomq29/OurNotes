import { useNavigate } from "react-router-dom";
import { Button, Card, Text, Flex } from "@mantine/core";
import { Title, Container} from "@mantine/core";

import {
  useAppDispatch,
  useAppSelector,

} from '../../App/providers/store/store';
import { logoutUser } from '../../Entities/User/model/CurrentUserSlice';
import { clearNotes } from '../../Entities/Notes/model/NotesSlice';


function LogOutPage(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(clearNotes());
    dispatch(logoutUser())
      .then(() => navigate("/"))
      .catch(console.log);
  };

  return (
    <>
      <div className="vstack gap-2 col-md-5 mx-auto">
        <Container size={420} my={100}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title ta="center">
              {currentUser?.login}
            </Title>
            <Text ta="center" size="xl">
            Вы точно хотите выйти?
            </Text>
            <Flex
              className="buttons"
              gap="xl"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
              mt={20}
            >
              {" "}
              <Button
                onClick={() => navigate("/")}
                type="button"
                variant="filled"
                className="btn btn-outline-success"
                size="md"
                w={200}
              >
                Нет, хочу остаться
              </Button>
              <Button
                onClick={logoutHandler}
                variant="light"
                type="button"
                className="btn btn-outline-secondary"
                size="md"
                color="red"
                w={200}
              >
                Да!
              </Button>
            </Flex>
          </Card>
          
        </Container>
      </div>
    </>
  );
}

export default LogOutPage;
