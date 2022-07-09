import { Container, Text, Title, Card, Group, createStyles } from "@mantine/core";
import { supabase } from "../utils/supabaseClient";
import { randomId } from "@mantine/hooks";
import Image from "next/image";

const IMAGE_URL = "/assets/bilka/tabla/imagini/";
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

function Tiglametalica(props) {
  const { classes } = useStyles();
  console.log(props);
  const products = props.productsData;
  console.log(products);
  return (
    <>
      <Container>
        <Title>Tigla metalica</Title>
        <Group>
          {products?.map((item) => (
            <Card key={randomId()} withBorder radius="md" p="md" className={classes.card}>
              <Card.Section>
                <Image
                  width={200}
                  height={200}
                  src={
                    IMAGE_URL +
                    item.props.model.toLowerCase() +
                    "/" +
                    item.props.model.toLowerCase() +
                    "-" +
                    item.props.finisaj.toLowerCase() +
                    "-" +
                    item.props.culori[Math.floor(Math.random() * (item.props.culori.length - 1))] +
                    ".jpg"
                  }
                  alt={item.nume}
                />
              </Card.Section>
              <Card.Section className={classes.section} mt="md">
                <Text weight={500} size="xs">
                  {item.nume}
                </Text>
              </Card.Section>
              <Card.Section className={classes.section} mt="md">
                <Text weight={700} size="xs">
                  {(item.pret_lista * 5 * 1.19).toFixed(2) + " lei mp"}
                </Text>
              </Card.Section>
            </Card>
          ))}
        </Group>
      </Container>
    </>
  );
}

export default Tiglametalica;

export const getStaticProps = async () => {
  const { data: productsData, error: productsError } = await supabase
    .from("PRODUSE")
    .select("grup, nume, producator, categorie, pret_lista, props, id")
    .eq("grup", "tabla")
    .or("categorie.eq.REZIDENTIAL,categorie.eq.RETROPANEL");
  return {
    props: {
      productsData,
      productsError,
    },
  };
};
