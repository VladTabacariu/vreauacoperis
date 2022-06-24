import { Select, NumberInput, TextInput, Checkbox, Button, Group, Box, Text, createStyles, Table, ActionIcon, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm, formList } from "@mantine/form";
import { useState } from "react";
import jsonata from "jsonata";
import { Forms, Trash } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  inputWrapper: {
    width: "100px",
  },
}));

function PieseFinisaj({ oferta, setOferta, products, nextStep, prevStep }) {
  const { classes } = useStyles();
  const nume_piese = jsonata("$distinct(*[grup='piese_finisaj'].nume)").evaluate(products);
  const form = useForm({
    initialValues: {
      piese: formList(oferta.piese_finisaj.piese),
      total: oferta.piese_finisaj.total,
    },
    validate: {
      piese: {
        nume: (value) => (value == "" ? "Selecteaza o piesa..." : null),
        cantitate: (value) => (value == 0 ? "Introdu cantitatea..." : null),
      },
    },
  });
  const updateField = (nume, cantitate, index) => {
    const pret = 0;
    const total = 0;
    if (nume && cantitate) {
      pret = jsonata(
        "*[(grup='piese_finisaj') and (nume='" +
          nume +
          "') and (props.finisaj='" +
          oferta.piese_finisaj.finisaj +
          "') and(props.grosime='" +
          oferta.piese_finisaj.grosime +
          "')].pret_lista"
      ).evaluate(products);

      form.setListItem("piese", index, {
        nume: nume,
        cantitate: cantitate,
        pret: pret,
        total: pret * cantitate,
        key: form.values.piese[index].key,
      });
      const sum = 0;
      form.values.piese.forEach((item, i) => {
        if (i != index) {
          sum = sum + item.total;
        }
      });
      total = sum + pret * cantitate;
      form.setFieldValue("total", total);
      setOferta((prevState) => ({
        ...prevState,
        piese_finisaj: { ...oferta.piese_finisaj, piese: formList(form.values.piese), total: total },
      }));
    } else {
      const sum = 0;
      form.values.piese.forEach((item, i) => {
        if (i != index) {
          sum = sum + item.total;
        }
      });
      total = sum + pret * cantitate;
      form.setFieldValue("total", total);
      setOferta((prevState) => ({
        ...prevState,
        piese_finisaj: { ...oferta.piese_finisaj, piese: formList(form.values.piese), total: total },
      }));
    }
  };

  const changedNume = (value, index) => {
    form.setListItem("piese", index, {
      nume: value,
      cantitate: form.values.piese[index].cantitate,
      pret: form.values.piese[index].pret,
      total: form.values.piese[index].total,
      key: form.values.piese[index].key,
    });
    updateField(value, form.values.piese[index].cantitate, index);
  };

  const changedCantitate = (value, index) => {
    form.setListItem("piese", index, {
      nume: form.values.piese[index].nume,
      cantitate: value,
      pret: form.values.piese[index].pret,
      total: form.values.piese[index].total,
      key: form.values.piese[index].key,
    });
    updateField(form.values.piese[index].nume, value, index);
  };

  const fields = form.values.piese.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select
        placeholder="Selecteaza"
        data={nume_piese}
        onChange={(event) => {
          changedNume(event, index);
        }}
        sx={{ flex: 3 }}
        value={item.nume}
        error={form.getListInputProps("piese", index, "nume").error}
      />
      <NumberInput
        defaultValue={0}
        min={0}
        sx={{ flex: 1 }}
        onChange={(event) => {
          changedCantitate(event, index);
        }}
        value={item.cantitate}
        error={form.getListInputProps("piese", index, "cantitate").error}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => {
          form.removeListItem("piese", index);
          updateField("", "", index);
        }}
        sx={{ flex: 0.5 }}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  const handleSubmit = (values) => {
    console.log(values);
    nextStep();
  };
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
                Cantitate
              </Text>
              <Text size="sm" sx={{ flex: 0.5 }} />
            </Group>
          ) : (
            <Text color="dimmed" align="center">
              Adauga o piesa de finisaj...
            </Text>
          )}

          {fields}

          <Group position="center" mt="md">
            <Button onClick={() => form.addListItem("piese", { nume: "", cantitate: 0, pret: 0, total: 0, key: randomId() })}>Adauga piesa</Button>
          </Group>
          <Center mt={20}>
            <NumberInput precision={2} defaultValue={0} label="Total" value={form.values.total} disabled />
          </Center>
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
