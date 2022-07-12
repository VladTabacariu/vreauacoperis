import { Select, Container, NumberInput, Button, Group, Box, Text, createStyles, ActionIcon, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm, formList } from "@mantine/form";
import jsonata from "jsonata";
import { Trash } from "tabler-icons-react";
import Image from "next/image";

const IMAGE_URL = "/assets/bilka/accesorii/";
function Accesorii({ oferta, setOferta, products, nextStep, prevStep }) {
  const nume_produse = jsonata("$distinct(*[grup='accesorii'].nume)[]").evaluate(products);
  const form = useForm({
    initialValues: {
      elemente: formList(oferta.accesorii.elemente),
      total: oferta.accesorii.total,
    },
    validate: {
      elemente: {
        nume: (value) => (value == "" ? "Selecteaza un accesoriu..." : null),
        cantitate: (value) => (value == 0 ? "Introdu cantitatea..." : null),
      },
    },
  });
  const updateField = (nume, cantitate, index) => {
    const pret = 0;
    const total = 0;
    const elemente = [];
    if (nume && cantitate >= 0) {
      pret = jsonata("*[(grup='accesorii') and (nume='" + nume + "')].pret_lista").evaluate(products) * 5 * 1.19;
      form.setListItem("elemente", index, {
        nume: nume,
        cantitate: cantitate,
        pret: pret,
        total: pret * cantitate,
        key: form.values.elemente[index].key,
      });
      const sum = 0;
      form.values.elemente.forEach((item, i) => {
        if (i != index) {
          sum = sum + item.total;
          elemente.push(item);
        } else {
          elemente.push({
            nume: nume,
            cantitate: cantitate,
            pret: pret,
            total: pret * cantitate,
            key: item.key,
          });
        }
      });
      total = sum + pret * cantitate;
      form.setFieldValue("total", total);
      setOferta((prevState) => ({
        ...prevState,
        accesorii: {
          ...oferta.accesorii,
          elemente: formList(elemente),
          total: total,
        },
      }));
    }
  };
  const deleteItem = (index) => {
    const elemente = form.values.elemente;
    const elementeNew = elemente.splice(index, 1);
    let total = 0;
    if (elemente.length) {
      total = jsonata("$sum(*[].total)").evaluate(elemente);
    }
    form.setFieldValue("total", total);
    setOferta((prevState) => ({
      ...prevState,
      accesorii: {
        ...oferta.accesorii,
        elemente: formList(elemente),
        total: total,
      },
    }));
  };
  const changedNume = (value, index) => {
    updateField(value, form.values.elemente[index].cantitate, index);
  };
  const changedCantitate = (value, index) => {
    updateField(form.values.elemente[index].nume, value, index);
  };
  const fields = form.values.elemente.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select
        placeholder="Selecteaza"
        data={nume_produse}
        onChange={(event) => {
          changedNume(event, index);
        }}
        sx={{ flex: 3 }}
        value={item.nume}
        error={form.getListInputProps("elemente", index, "nume").error}
      />
      <NumberInput
        defaultValue={0}
        hideControls={true}
        min={0}
        sx={{ flex: 1 }}
        onChange={(event) => {
          changedCantitate(event, index);
        }}
        value={item.cantitate}
        error={form.getListInputProps("elemente", index, "cantitate").error}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => {
          form.removeListItem("elemente", index);
          deleteItem(index);
        }}
        sx={{ flex: 0.5 }}
      >
        <Trash size={16} />
      </ActionIcon>
      <Container sx={{ flex: 1, padding: 0 }}>
        <Image width={45} height={45} alt={item.nume} src={IMAGE_URL + item.nume.toLowerCase().replaceAll(" ", "-") + ".jpg"}></Image>
      </Container>
    </Group>
  ));
  const handleSubmit = (values) => {
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
              <Text size="sm" sx={{ flex: 1 }} />
            </Group>
          ) : (
            <Text color="dimmed" align="center">
              Adauga un accesoriu...
            </Text>
          )}

          {fields}

          <Group position="center" mt="md">
            <Button
              onClick={() =>
                form.addListItem("elemente", {
                  nume: "",
                  cantitate: 0,
                  pret: 0,
                  total: 0,
                  key: randomId(),
                })
              }
            >
              Adauga piesa
            </Button>
          </Group>
          <Center mt={20}>
            <NumberInput
              styles={{
                input: { fontSize: 14, fontWeight: "bold" },
                disabled: { color: "#000000 !important" },
              }}
              precision={2}
              defaultValue={0}
              label="Total"
              value={form.values.total}
              disabled
            />
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

export default Accesorii;
