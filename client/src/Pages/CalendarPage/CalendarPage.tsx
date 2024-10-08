import { Container, Flex } from '@mantine/core';
import { useAppSelector } from '../../App/providers/store/store';
import CalendarComponent from '../../Entities/Events/ui/CalendarComponent';

function CalendarPage(): JSX.Element {
  const currentPair = useAppSelector((store) => store.currentUserStore.pair);
  return (
    <Flex
      justify="center"
      direction={'column'}
      gap={'md'}
      align={'center'}
      w={'100%'}
    >
      {currentPair?.id ? (
        <CalendarComponent />
      ) : (
        <Container>Календарь доступен только в паре</Container>
      )}
    </Flex>
  );
}

export default CalendarPage;
