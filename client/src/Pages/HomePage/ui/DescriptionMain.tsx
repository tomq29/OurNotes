import { memo } from 'react';
import {
  Title,
  Text,
  Button,
  Container,
  Center,
  Card,
  ThemeIcon,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  IconCalendarEvent,
  IconMessageCircle,
  IconCurrencyDollar,
  IconList,
  IconHeartHandshake,
  IconClipboardText,
} from '@tabler/icons-react';
import { useAppSelector } from '../../../App/providers/store/store';
import { useNavigate } from 'react-router-dom';

function DescriptionMain(): JSX.Element {
  const autoplay = useRef(Autoplay({ delay: 2500 }));
  const navigate = useNavigate()

  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  return (
    <Container size="md" className="descriptionContainer" mt="xl">
      <Title
        ta="center"
        order={1}
        color="blue"
        mb="md"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        OurNotes
      </Title>
      <Text
        ta="center"
        size="lg"
        mb="xl"
        style={{ fontSize: '20px', lineHeight: '1.5' }}
      >
        📅 Планируйте важные события, 💬 записывайте идеи и 💰 управляйте
        финансами — все в одном удобном приложении. <br />
        Сделайте вашу совместную жизнь проще и счастливее с OurNotes!
      </Text>

      {/* Carousel for Feature Highlights */}
      <Carousel
        slideSize="50%"
        slideGap="md"
        loop
        plugins={[autoplay.current]}
        align="start"
        slidesToScroll={1}
        mb="xl"
      >
        {/* Add Partner Feature */}
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center>
              <ThemeIcon size="lg" color="blue">
                <IconHeartHandshake />
              </ThemeIcon>
            </Center>
            <Text ta="center" mt="md">
              Добавить партнера
            </Text>
            <Text ta="center" size="sm">
              Соединитесь с вашим партнером и начните совместную работу с первых
              шагов.
            </Text>
          </Card>
        </Carousel.Slide>

        {/* Joint Notes Feature */}
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center>
              <ThemeIcon size="lg" color="blue">
                <IconClipboardText />
              </ThemeIcon>
            </Center>
            <Text ta="center" mt="md">
              Совместные заметки
            </Text>
            <Text ta="center" size="sm">
              Пишите заметки вместе, ведите общие дневники и делитесь мыслями.
            </Text>
          </Card>
        </Carousel.Slide>

        {/* Budget Management Feature */}
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center>
              <ThemeIcon size="lg" color="blue">
                <IconCurrencyDollar />
              </ThemeIcon>
            </Center>
            <Text ta="center" mt="md">
              Управление бюджетом
            </Text>
            <Text ta="center" size="sm">
              Совместно управляйте финансами и планируйте бюджет вашей пары.
            </Text>
          </Card>
        </Carousel.Slide>

        {/* Shared To-Do Lists Feature */}
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center>
              <ThemeIcon size="lg" color="blue">
                <IconList />
              </ThemeIcon>
            </Center>
            <Text ta="center" mt="md">
              Общие списки дел
            </Text>
            <Text ta="center" size="sm">
              Составляйте и ведите совместные списки покупок и задач.
            </Text>
          </Card>
        </Carousel.Slide>

        {/* Discussion Topics Feature */}
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center>
              <ThemeIcon size="lg" color="blue">
                <IconMessageCircle />
              </ThemeIcon>
            </Center>
            <Text ta="center" mt="md">
              Вопросы на обсуждение
            </Text>
            <Text ta="center" size="sm">
              Создавайте темы для обсуждения и делитесь мыслями друг с другом.
            </Text>
          </Card>
        </Carousel.Slide>

        {/* Shared Calendar Feature */}
        <Carousel.Slide>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center>
              <ThemeIcon size="lg" color="blue">
                <IconCalendarEvent />
              </ThemeIcon>
            </Center>
            <Text ta="center" mt="md">
              Общий календарь
            </Text>
            <Text ta="center" size="sm">
              Планируйте события вместе и следите за расписанием друг друга.
            </Text>
          </Card>
        </Carousel.Slide>
      </Carousel>

      {!currentUser && (
        <Center>
          <Button onClick={()=> navigate('/auth/login')} size="lg" color="blue" radius="md">
            Начать сейчас
          </Button>
        </Center>
      )}
    </Container>
  );
}

export default memo(DescriptionMain);
