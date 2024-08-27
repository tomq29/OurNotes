import { Flex } from '@mantine/core';
import CalendarComponent from '../../Entities/Events/ui/CalendarComponent';

function CalendarPage(): JSX.Element {
  return (
    <Flex justify="center" direction={'column'} gap={'md'} align={'center'}>
      <div>Календарь</div>
      <CalendarComponent />
    </Flex>
  );
}

export default CalendarPage;
