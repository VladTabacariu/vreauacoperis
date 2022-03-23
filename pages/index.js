import Image from "next/image";
import Hero from "../components/hero/Hero.js";
import FeaturesGrid from "../components/features/FeaturesGrid.js";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabaseClient";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Hero data={props} />
      <FeaturesGrid title="Serviciile noastre vă vor scuti de timp și bani!" description="" />
      <main className={styles.main}></main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data: carouselData, error: carouselError } = await supabase.from("CAROUSEL").select();

  return {
    props: {
      carouselData,
      carouselError,
    },
  };
};
