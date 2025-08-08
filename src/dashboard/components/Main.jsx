import { Box, Toolbar } from "@mui/material";

export const Main = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#e2e2e2",
        p: 3,
        borderRadius: "5px",
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
};
