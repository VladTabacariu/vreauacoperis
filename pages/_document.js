import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="ro">
        <Head>
          <style>
            {`
            body {
              min-height: 100vh;
            }
            #__next { display: flex;
              flex-direction: column;
              min-height: 100vh; }
          `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
