import CarouselMain from "./ui/CarouselMain";
import DescriptionMain from "./ui/DescriptionMain";

function HomePage(): JSX.Element {
  return (
    <div
      className="containerSlyder"
      style={{ width: "800px", margin: "0 auto" }}
    >
      <div style={{ display: "flex", width: "100%", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <DescriptionMain />
        </div>
        <div style={{ flex: 1 }}>
          <CarouselMain />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
