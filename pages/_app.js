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
