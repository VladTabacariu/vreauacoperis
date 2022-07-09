import Head from "next/head";
import Layout from "../components/layout/Layout.js";
import HeaderAction from "../components/header/HeaderAction.js";
import Footer from "../components/footer/Footer.js";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "../styles/globals.css";
import Script from "next/script";
import React from "react";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>vreauacoperis.ro</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          colors: {},
        }}
      >
        <NotificationsProvider>
          <HeaderAction />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
