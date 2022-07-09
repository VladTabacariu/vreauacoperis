import { Select, NumberInput, Button, Group, Box, Text, createStyles, ActionIcon, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm, formList } from "@mantine/form";
import jsonata from "jsonata";
import { Trash } from "tabler-icons-react";

function SistemPluvial({ oferta, setOferta, products, nextStep, prevStep }) {
  const nume_produse = jsonata("$distinct(*[grup='sistem_pluvial'].nume)[]").evaluate(products);
  const dimensiuni = jsonata("$distinct(*[grup='sistem_pluvial'].props.dimensiune)[]").evaluate(products);
  const culori = jsonata("$distinct(*[grup='sistem_pluvial'].props.culori)[]").evaluate(products);
  const form = useForm({
    initialValues: {
      dimensiune: oferta.sistem_pluvial.dimensiune,
      culoare: oferta.sistem_pluvial.culoare,
      elemente: formList(oferta.sistem_pluvial.elemente),
      total: oferta.sistem_pluvial.total,
    },
    validate: {
      dimensiune: (value) => (value == "" ? "Selecteaza dimensiunea..." : null),
      culoare: (value) => (value == "" ? "Selecteaza culoarea..." : null),
      elemente: {
        nume: (value) => (value == "" ? "Selecteaza un element..." : null),
        cantitate: (value) => (value == 0 ? "Introdu cantitatea..." : null),
      },
    },
  });
  const updateField = (nume, cantitate, index) => {
    const pret = 0;
    const total = 0;
    const elemente = [];
    if (nume && cantitate >= 0) {
      pret = jsonata("*[(grup='sistem_pluvial') and (nume='" + nume + "') and (props.dimensiune='" + form.values.dimensiune + "')].pret_lista").evaluate(products);
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
        sistem_pluvial: {
          ...oferta.sistem_pluvial,
          elemente: formList(elemente),
          total: total,
        },
      }));
    }
  };
  const updateFields = (dimensiune) => {
    let elemente = [];
    let pret = 0;
    let total = 0;
    form.values.elemente.forEach((item) => {
      pret = jsonata("*[(grup='sistem_pluvial') and (nume='" + item.nume + "') and (props.dimensiune='" + dimensiune + "')].pret_lista").evaluate(products);
      elemente.push({
        nume: item.nume,
        cantitate: item.cantitate,
        pret: pret,
        total: pret * item.cantitate,
        key: item.key,
      });
      total = total + pret * item.cantitate;
    });
    form.setValues({ dimensiune: dimensiune, culoare: form.values.culoare, elemente: elemente, total: total });
    setOferta((prevState) => ({
      ...prevState,
      sistem_pluvial: {
        dimensiune: dimensiune,
        culoare: form.values.culoare,
        elemente: formList(elemente),
        total: total,
      },
    }));
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
      sistem_pluvial: {
        ...oferta.sistem_pluvial,
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
  const changedDimensiune = (value) => {
    updateFields(value);
  };
  const changedCuloare = (value) => {
    form.setFieldValue("culoare", value);
    setOferta((prevState) => ({
      ...prevState,
      sistem_pluvial: {
        ...oferta.sistem_pluvial,
        dimensiune: form.values.dimensiune,
        culoare: value,
      },
    }));
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
    </Group>
  ));
  const handleSubmit = (values) => {
    nextStep();
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ maxWidth: 800 }} mx="auto">
          <Group>
            <Select label="Dimensiune" data={dimensiuni} onChange={changedDimensiune} value={form.values.dimensiune} error={form.getInputProps("dimensiune").error} />
            <Select label="Culoare" data={culori} onChange={changedCuloare} value={form.values.culoare} error={form.getInputProps("culoare").error} />
          </Group>
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

export default SistemPluvial;
