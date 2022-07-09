import React from "react";
import { Container } from "@mantine/core";
import Script from "next/script";

function Layout({ children }) {
  return (
    <Container fluid={true} px={0} sx={{ flex: 1 }}>
      <React.Fragment>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B77NJJW0P2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-B77NJJW0P2');
        `}
        </Script>
      </React.Fragment>
      {children}
    </Container>
  );
}
export default Layout;
