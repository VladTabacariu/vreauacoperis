import { Container, Text, Title, Card, Group, createStyles } from "@mantine/core";
import { supabase } from "../utils/supabaseClient";
import jsonata from "jsonata";
import { randomId } from "@mantine/hooks";
import Image from "next/image";

const IMAGE_URL = "/assets/bilka/accesorii/";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    flex: "1 21%",
    [theme.fn.smallerThan("sm")]: {
      flex: "1 36%",
    },
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

function Accesorii(props) {
  const { classes } = useStyles();
  console.log(props);
  const products = jsonata("*[(grup='accesorii') and (categorie='REZIDENTIAL')]").evaluate(props.productsData);
  console.log(products);
  return (
    <>
      <Container>
        <Title>Accesorii tigla metalica</Title>
        <Group>
          {products.map((item) => {
            const rand = 0;
            return (
              <Card key={randomId()} withBorder radius="md" p="md" className={classes.card}>
                <Card.Section>
                  <Image width={200} height={200} src={IMAGE_URL + item.nume.toLowerCase().replaceAll(" ", "-") + ".jpg"} alt={item.nume} />
                </Card.Section>
                <Card.Section className={classes.section} mt="md">
                  <Text weight={500} size="xs">
                    {item.nume}
                  </Text>
                </Card.Section>
                <Card.Section className={classes.section} mt="md">
                  <Text weight={700} size="xs">
                    {(item.pret_lista * 5 * 1.19).toFixed(2) + " lei buc"}
                  </Text>
                </Card.Section>
              </Card>
            );
          })}
        </Group>
      </Container>
    </>
  );
}

export default Accesorii;

export const getServerSideProps = async () => {
  const { data: productsData, error: productsError } = await supabase.from("PRODUSE").select();
  return {
    props: {
      productsData,
      productsError,
    },
  };
};
