import Hero from "../components/hero/Hero.js";
import FeaturesGrid from "../components/features/FeaturesGrid.js";
import ContactForm from "../components/contact/ContactForm.js";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabaseClient";

export default function Home(props) {
  return (
    <>
      <div className={styles.container}>
        <Hero data={props} />
        <FeaturesGrid title="Serviciile noastre vă vor scuti de timp și bani!" description="" />
        <ContactForm title="Daca ai nevoie de ajutor nu ezita sa ne contactezi!" />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const { data: carouselData, error: carouselError } = await supabase.from("CAROUSEL").select();

  return {
    props: {
      carouselData,
      carouselError,
    },
  };
};
