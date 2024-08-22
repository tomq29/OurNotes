import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";

function CarouselMain() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const images = [
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
  ];

  return (
    <Carousel
      withIndicators
      height={200}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      style={{ height: "100%" }}
    >
      {images.map((image) => (
        <Carousel.Slide key={image} style={{ height: "100%" }}>
          <img src={image}  style={{ height: "100%" }}/>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default CarouselMain;
