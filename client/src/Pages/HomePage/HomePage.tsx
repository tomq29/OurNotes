import { Container, Flex } from '@mantine/core';
import CarouselMain from './ui/CarouselMain';
import DescriptionMain from './ui/DescriptionMain';

function HomePage(): JSX.Element {
  return (
    <Container>
      <DescriptionMain />
      <CarouselMain />
    </Container>
  );
}

export default HomePage;
