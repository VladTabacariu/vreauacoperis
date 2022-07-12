import Head from "next/head";
import Layout from "../components/layout/Layout.js";
import HeaderAction from "../components/header/HeaderAction.js";
import Footer from "../components/footer/Footer.js";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "../styles/globals.css";
import React from "react";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>vreauacoperis.ro</title>
        <meta name="description" content="Vrei sa afli cat te costa acoperisul din tigla metalica? Nimic mai simplu! Te ajutam noi!" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/icon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/icon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/icon/favicon-16x16.png" />
        <link rel="manifest" href="/logo/icon/site.webmanifest" />
        <link rel="mask-icon" href="/logo/icon/safari-pinned-tab.svg" color="#228be6" />
        <meta name="msapplication-TileColor" content="#228be6" />
        <meta name="theme-color" content="#228be6" />
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
