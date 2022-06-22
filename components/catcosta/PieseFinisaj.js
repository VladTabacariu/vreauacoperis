import { Select, NumberInput, TextInput, Checkbox, Button, Group, Box, Text, createStyles, Table } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm, formList } from "@mantine/form";
import { useState } from "react";
import jsonata from "jsonata";

const useStyles = createStyles((theme) => ({
  inputWrapper: {
    width: "100px",
  },
}));

function PieseFinisaj({ oferta, setOferta, products, nextStep, prevStep }) {
  const { classes } = useStyles();
  console.log(oferta, products);
  const nume_piese = jsonata("$distinct(*[grup='piese_finisaj'].nume)").evaluate(products);
  console.log(nume_piese);
  const form = useForm({
    initialValues: {
      piese: formList([{ ...oferta.piese_finisaj.piese[0], key: randomId() }]),
    },
  });
  const changedNume = (value) => {
    console.log(value);
  };
  const fields = form.values.piese.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select placeholder="Selecteaza" data={nume_piese} onChange={changedNume} {...form.getListInputProps("piese", index, "nume")} sx={{ flex: 3 }} />
      <NumberInput sx={{ flex: 1 }} />
      <NumberInput sx={{ flex: 1 }} />
      <NumberInput sx={{ flex: 1 }} />
    </Group>
  ));
  const handleSubmit = (values) => {
    console.log(values);
    nextStep();
  };
  console.log(form.values);
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ maxWidth: 800 }} mx="auto">
          {fields.length > 0 ? (
            <Group mb="xs">
              <Text weight={500} size="sm" sx={{ flex: 3 }}>
                Nume
              </Text>
              <Text weight={500} size="sm" sx={{ flex: 1 }}>
                Pret
              </Text>
              <Text weight={500} size="sm" sx={{ flex: 1 }}>
                Cantitate
              </Text>
              <Text weight={500} size="sm" sx={{ flex: 1 }}>
                Total
              </Text>
            </Group>
          ) : (
            <Text color="dimmed" align="center">
              No one here...
            </Text>
          )}

          {fields}

          <Group position="center" mt="md">
            <Button onClick={() => form.addListItem("piese", { name: "", active: false, key: randomId() })}>Adauga piesa</Button>
          </Group>
        </Box>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Înapoi
          </Button>
          <Button type="submit">Următorul pas</Button>
        </Group>
      </form>
    </>
  );
}

export default PieseFinisaj;
