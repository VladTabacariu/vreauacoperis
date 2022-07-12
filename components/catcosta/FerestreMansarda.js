import { Select, NumberInput, Button, Group, Box, Text, createStyles, ActionIcon, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm, formList } from "@mantine/form";
import { useState } from "react";
import jsonata from "jsonata";
import { Trash } from "tabler-icons-react";

function FerestreMansarda({ oferta, setOferta, products, nextStep, prevStep }) {
  const nume_elemente = jsonata("$distinct(*[grup='ferestre_mansarda'].nume)").evaluate(products);
  //const [dimensiuni, setDimensiuni] = useState([]);
  const form = useForm({
    initialValues: {
      elemente: formList(oferta.ferestre_mansarda.elemente),
      total: oferta.ferestre_mansarda.total,
    },
    validate: {
      elemente: {
        nume: (value) => (value == "" ? "Selecteaza o piesa..." : null),
        dimensiune: (value) => (value == "" ? "Selecteaza dimensiune..." : null),
        cantitate: (value) => (value == 0 ? "Introdu cantitatea..." : null),
      },
    },
  });
  const fields = form.values.elemente?.map((item, index) => {
    const dimensiuni = [];
    if (item.nume) {
      dimensiuni = jsonata("*[(grup='ferestre_mansarda') and (nume='" + item.nume + "')].props.dimensiune").evaluate(products);
    }
    return (
      <Group key={item.key} mt="xs">
        <Select
          placeholder="Selecteaza"
          data={nume_elemente}
          onChange={(event) => {
            changedNume(event, index);
          }}
          sx={{ flex: 3 }}
          value={item.nume}
          error={form.getListInputProps("elemente", index, "nume").error}
        />
        <Select
          placeholder="Selecteaza"
          data={dimensiuni}
          onChange={(event) => {
            changedDimensiune(event, index);
          }}
          sx={{ flex: 2 }}
          value={item.dimensiune}
          error={form.getListInputProps("elemente", index, "dimensiune").error}
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
    );
  });
  const updateField = (nume, dimensiune, cantitate, index) => {
    const pret = 0;
    const total = 0;
    const elemente = [];
    if (nume && dimensiune && cantitate >= 0) {
      pret = jsonata("*[(grup='ferestre_mansarda') and (nume='" + nume + "') and (props.dimensiune='" + dimensiune + "')].pret_lista").evaluate(products) * 5 * 1.19;
      form.setListItem("elemente", index, {
        nume: nume,
        dimensiune: dimensiune,
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
            dimensiune: dimensiune,
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
        ferestre_mansarda: {
          ...oferta.ferestre_mansarda,
          elemente: formList(elemente),
          total: total,
        },
      }));
    } else {
      form.setListItem("elemente", index, {
        nume: nume,
        dimensiune: dimensiune,
        cantitate: cantitate,
        pret: form.values.elemente[index].pret,
        total: form.values.elemente[index].total,
        key: form.values.elemente[index].key,
      });
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
      ferestre_mansarda: {
        ...oferta.ferestre_mansarda,
        elemente: formList(elemente),
        total: total,
      },
    }));
  };
  const changedNume = (value, index) => {
    //setDimensiuni(jsonata("*[(grup='ferestre_mansarda') and (nume='" + value + "')].props.dimensiune").evaluate(products));
    updateField(value, form.values.elemente[index].dimensiune, form.values.elemente[index].cantitate, index);
  };
  const changedDimensiune = (value, index) => {
    updateField(form.values.elemente[index].nume, value, form.values.elemente[index].cantitate, index);
  };
  const changedCantitate = (value, index) => {
    updateField(form.values.elemente[index].nume, form.values.elemente[index].dimensiune, value, index);
  };
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
              <Text weight={500} size="sm" sx={{ flex: 2 }}>
                Dimensiune
              </Text>
              <Text weight={500} size="sm" sx={{ flex: 1 }}>
                Cantitate
              </Text>
              <Text size="sm" sx={{ flex: 0.5 }} />
            </Group>
          ) : (
            <Text color="dimmed" align="center">
              Adauga o fereastra...
            </Text>
          )}

          {fields}

          <Group position="center" mt="md">
            <Button
              onClick={() =>
                form.addListItem("elemente", {
                  nume: "",
                  dimensiune: "",
                  cantitate: 0,
                  pret: 0,
                  total: 0,
                  key: randomId(),
                })
              }
            >
              Adauga o fereastra
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

export default FerestreMansarda;
