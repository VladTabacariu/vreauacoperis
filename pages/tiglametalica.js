import { Container, Select, Stepper, Text, Title, Card, Group, createStyles, Chips, Chip, SegmentedControl } from "@mantine/core";
import { supabase } from "../utils/supabaseClient";
import jsonata from "jsonata";
import { useState, useCallback } from "react";
import { randomId } from "@mantine/hooks";
import Image from "next/image";

const IMAGE_URL = "https://pkzezxjdcmqakrniuzmi.supabase.co/storage/v1/object/public/vreauacoperis.ro/public/bilka/tabla/";
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
  const products = jsonata("*[grup='tabla']").evaluate(props.productsData);
  console.log(products);
  const [culoriState, setCuloriState] = useState(
    products.map((item) => {
      return item.props.culori[0];
    })
  );
  products.forEach((item) => {
    item.props.culoare = item.props.culori[0];
  });
  const [items, setItems] = useState(products);

  const cardChange = useCallback((value, index) => {
    setItems((prevState) =>
      prevState.map((item, index2) => {
        console.log(value);
        const newItem = { ...item, props: { ...item.props, culoare: value } };
        console.log(newItem.props.culoare);
        console.log(newItem, index, index2);
        return index == index2 ? newItem : item;
      })
    );
  }, []);

  return (
    <>
      <Container>
        <Title>Tigla metalica</Title>
        <Group>
          {items.map((item, index) => (
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
                    item.props.culoare +
                    ".jpg"
                  }
                  alt={item.nume}
                />
              </Card.Section>
              <Card.Section className={classes.section} mt="md">
                <Text weight={500} size="xs">
                  {item.nume}
                </Text>
                <Select
                  label="Culoare"
                  defaultValue={item.props.culoare}
                  size="xs"
                  data={item.props.culori}
                  onChange={(value) => cardChange(value, index)}
                />
              </Card.Section>
              <Card.Section className={classes.section} mt="md">
                <Text color="dimmed" size="xs">
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

export const getServerSideProps = async () => {
  const { data: productsData, error: productsError } = await supabase.from("PRODUSE").select();
  return {
    props: {
      productsData,
      productsError,
    },
  };
};
