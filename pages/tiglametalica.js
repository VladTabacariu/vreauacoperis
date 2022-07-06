import { Container, Stepper, Text, Title, Card, Group, createStyles, Chips, Chip } from "@mantine/core";
import { supabase } from "../utils/supabaseClient";
import jsonata from "jsonata";
import { randomId } from "@mantine/hooks";
import Image from "next/image";

const IMAGE_URL = "https://pkzezxjdcmqakrniuzmi.supabase.co/storage/v1/object/public/vreauacoperis.ro/public/bilka/tabla/";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
  const products = jsonata("*[grup='tabla']").evaluate(props.productsData);
  console.log(products);
  return (
    <>
      <Container>
        <Title>Tigla metalica</Title>
        <div>test</div>
        <Group>
          {products.map((item) => (
            <Card sx={{ flex: "1 0 500px" }} key={randomId()} withBorder radius="md" p="md" className={classes.card}>
              <Card.Section>
                <Chips>
                  {item.props.culori.map((item) => (
                    <Chip key={randomId()}>{item}</Chip>
                  ))}
                </Chips>
              </Card.Section>
              <Card.Section className={classes.section} mt="md">
                <Text>{item.nume}</Text>
              </Card.Section>
            </Card>
          ))}
        </Group>
      </Container>
    </>
  );
}

export default Tiglametalica;

export const getServerSideProps = async () => {
  const { data: productsData, error: productsError } = await supabase.from("PRODUSE").select();
  return {
    props: {
      productsData,
      productsError,
    },
  };
};
