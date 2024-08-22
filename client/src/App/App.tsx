import { useEffect } from "react";
import AppRouter from "./providers/router/AppRouter";
import NavBar from "../Widgets/NavBar/NavBar";
import { useAppDispatch } from "./providers/store/store";
import { refreshUser } from "../Entities/User/model/CurrentUserSlice";
import "@mantine/carousel/styles.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser()).catch(console.log);
  }, []);

  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  );
}

export default App;
