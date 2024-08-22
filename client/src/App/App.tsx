import { useEffect } from "react";
import AppRouter from "./providers/router/AppRouter";
import NavBar from "../Widgets/NavBar/NavBar";
import { useAppDispatch } from "./providers/store/store";
import { refreshUser } from "../Entities/User/model/CurrentUserSlice";
import { Footer } from "../Widgets/Footer/Footer";
import { AppShell } from "@mantine/core";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser()).catch(console.log);
  }, []);

  return (
    <AppShell>
      <AppShell.Header>
        <NavBar />
      </AppShell.Header>
      <AppShell.Main>
        <AppRouter />
      </AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
