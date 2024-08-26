import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
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
          <Title ta="center"> {currentUser?.login}, Вы точно хотите выйти?</Title>
          <div className="buttons" >
            <Button
              color="red"
              onClick={logoutHandler}
              variant="light"
              type="button"
              className="btn btn-outline-secondary"
              fullWidth mt='sm'
              size="md"
            >
              Да!
            </Button>
            <Button
              onClick={() => navigate("/")}
              type="button"
              variant="default"
              className="btn btn-outline-success"
              fullWidth mt='sm'
              size="md"
            >
              Нет, хочу остаться
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LogOutPage;
