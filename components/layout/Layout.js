import React from "react";
import { Container } from "@mantine/core";

function Layout({ children }) {
  return (
    <Container fluid={true} px={0} sx={{ flex: 1 }}>
      {children}
    </Container>
  );
}
export default Layout;
