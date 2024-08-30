import { Box, Text } from "@mantine/core";

function CloudMessage() {
  return (
    <Box
      style={{
        position: "relative",
        textAlign: "center",
        marginBottom: "25px",
      }}
    >
      <Box
        ml={1}
        style={{
          background: "#e5aa3d",
          borderRadius: "4px",
          padding: "1px 4px",
          display: "inline-block",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Text fw={500} color="white" size="xs" style={{ fontSize: "10px" }}> {/* Уменьшен размер текста */}
          Скоро
        </Text>
      </Box>
    </Box>
  );
}

export default CloudMessage;
