function NotFoundPage(): JSX.Element {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1
        style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Потерялся 404 раза?
      </h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Иди обниму</h2>
      <img
        src="/404.gif"
        alt="Not Found"
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}

export default NotFoundPage;
