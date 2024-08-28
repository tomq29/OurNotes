import { Container, SimpleGrid, Title, Text, Button, Image } from '@mantine/core';
import image from './Garfield.gif';
import classes from './NotFoundImage.module.css';

function SoonPage() {
  return (
    <div>
      <Container>
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <Container className={classes.centered} flex={1}>
            <Title size={100}>Скоро</Title>
            <Text mt={15} c="dimmed" size="lg">
              Разработчики работают над этой фичей
            </Text>
            <Button variant="outline" size="md" mt="xl">
              Вернуться на главную страницу
            </Button>
          </Container>
          <Image src={image}/>
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default SoonPage;
