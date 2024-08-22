import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import imgCarousel1 from "../img/1img.png";
import imgCarousel2 from "../img/2img.png";

function CarouselMain() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const images = [imgCarousel1, imgCarousel2];

  return (
    <Carousel
      withIndicators
      height={200}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      style={{ height: "100%", width: "100%" }}
    >
      {images.map((image) => (
        <Carousel.Slide key={image} style={{ height: "100%", width: "100%" }}>
          <img
            src={image}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default CarouselMain;
