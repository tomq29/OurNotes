import CarouselMain from "./ui/CarouselMain";
import DescriptionMain from "./ui/DescriptionMain";
import "@mantine/carousel/styles.css"

function HomePage(): JSX.Element {
  return (
    <div
      className="containerSlyder"
      style={{ width: "800px", margin: "30px auto" }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1", width: "100%", height: "100%" }}>
          <DescriptionMain />
        </div>
        <div style={{ flex: "1", width: "100%", height: "100%" }}>
          <CarouselMain />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
