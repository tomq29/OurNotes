import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import imgCarousel1 from '../img/1img.png';
import imgCarousel2 from '../img/2img.png';
import { Image } from '@mantine/core';

function CarouselMain(): JSX.Element {
  // const autoplay = useRef(Autoplay({ delay: 3000 }));

  const images = [imgCarousel1, imgCarousel2];

  return (
    <Carousel
      slideSize="70%"
      slideGap="md"
      loop
      withIndicators
      // plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={autoplay.current.reset}
    >
      {images.map((image) => (
        <Carousel.Slide>
          <Image src={image} alt="image" />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default CarouselMain;
