import { Container, SimpleGrid, Title, Text, Button, Image } from "@mantine/core";
import classes from '../SoonPage/NotFoundImage.module.css';
import { useNavigate } from "react-router-dom";


function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();  
  return (
    // <div
    //   className="container-fluid d-flex flex-column justify-content-center align-items-center"
    //   style={{
    //     height: "100vh",
    //     textAlign: "center",
    //   }}
    // >
    //   <h1
    //     style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "1rem" }}
    //   >
    //     Потерялся 404 раза?
    //   </h1>
    //   <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Иди обниму</h2>
    //   <img
    //     src="/404.gif"
    //     alt="Not Found"
    //     style={{
    //       maxWidth: "100%",
    //       height: "auto",
    //       borderRadius: "8px",
    //     }}
    //   />
    // </div>
    <>
      <Container>
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src='/404.gif'/>
          <Container className={classes.centered} flex={1}>
            <Title size={90}>Потерялся 404 раза?</Title>
            <Text mt={15} c="dimmed" size="lg">
            Иди обниму
            </Text>
            <Button onClick={() => navigate('/')} variant="outline" size="md" mt="xl">
              Вернуться на главную страницу
            </Button>
          </Container>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default NotFoundPage;
