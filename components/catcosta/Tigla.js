import { Select, NumberInput, TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import jsonata from "jsonata";

const Tigla = ({ oferta, setOferta, products, nextStep, prevStep }) => {
  console.log(oferta);
  const [inputsState, setInputsState] = useState({
    finisaj: !oferta.tigla.finisaj,
    grosime: !oferta.tigla.grosime,
    culoare: !oferta.tigla.culoare,
  });

  const modele = jsonata("$distinct(*[grup='tabla'].props.model)").evaluate(products);
  const [finisaje, setFinisaje] = useState([]);
  const [grosimi, setGrosimi] = useState([]);
  const [culori, setCulori] = useState([]);

  if (oferta.tigla.model && finisaje.length == 0) {
    setFinisaje(jsonata("$distinct(*[grup='tabla'].props[model='" + oferta.tigla.model + "'][].finisaj)").evaluate(products));
  }
  if (oferta.tigla.finisaj && grosimi.length == 0) {
    setGrosimi(jsonata("$distinct(*[grup='tabla'].props[(model='" + oferta.tigla.model + "') and (finisaj='" + oferta.tigla.finisaj + "')][].grosime)").evaluate(products));
  }
  if (oferta.tigla.grosime && culori.length == 0) {
    setCulori(
      jsonata(
        "$distinct(*[grup='tabla'].props[(model='" +
          oferta.tigla.model +
          "') and (finisaj='" +
          oferta.tigla.finisaj +
          "') and (grosime='" +
          oferta.tigla.grosime +
          "')][].culori)"
      ).evaluate(products)
    );
  }
  const form = useForm({
    initialValues: {
      ...oferta.tigla,
    },
    validate: (values) => ({
      model: values.model == "" ? "Alege modelul" : null,
      finisaj: values.finisaj == "" ? "Alege finisajul" : null,
      grosime: values.grosime == "" ? "Alege grosimea" : null,
      culoare: values.culoare == "" ? "Alege culoarea" : null,
      suprafata: values.finisaj == "" ? "Introdu suprafata" : null,
    }),
  });
  const updateFiels = (model, finisaj, grosime, culoare, suprafata) => {
    const finisaje = [];
    const grosimi = [];
    const culori = [];
    const pret = 0;
    const total = 0;
    finisaje = jsonata("$distinct(*[grup='tabla'].props[model='" + model + "'][].finisaj)").evaluate(products);
    grosimi = jsonata("$distinct(*[grup='tabla'].props[(model='" + model + "') and (finisaj='" + finisaj + "')][].grosime)").evaluate(products);
    culori = jsonata("$distinct(*[grup='tabla'].props[(model='" + model + "') and (finisaj='" + finisaj + "') and (grosime='" + grosime + "')][].culori)").evaluate(products);
    pret = jsonata("*[(grup='tabla') and (props.model='" + model + "') and (props.finisaj='" + finisaj + "') and (props.grosime='" + grosime + "')].pret_lista").evaluate(
      products
    );
    total = suprafata * pret;
    if (finisaje) {
      if (!finisaje.includes(finisaj)) {
        form.setFieldValue("finisaj", "");
        form.setFieldValue("grosime", "");
        form.setFieldValue("culoare", "");
        form.setFieldValue("pret", 0);
        form.setFieldValue("total", 0);
      }
      setFinisaje(finisaje);
    }
    if (grosimi) {
      if (!grosimi.includes(grosime)) {
        form.setFieldValue("grosime", "");
        form.setFieldValue("culoare", "");
        form.setFieldValue("pret", 0);
        form.setFieldValue("total", 0);
      }
      setGrosimi(grosimi);
    }
    if (culori) {
      if (!culori.includes(culoare)) {
        form.setFieldValue("culoare", "");
        form.setFieldValue("pret", 0);
        form.setFieldValue("total", 0);
      }
      setCulori(culori);
    }
    if (pret) {
      form.setFieldValue("pret", pret);
    }
    if (total) {
      form.setFieldValue("total", total);
    }

    setOferta((prevState) => ({
      ...prevState,
      tigla: { model: model, finisaj: finisaj, grosime: grosime, culoare: culoare, pret: pret, suprafata: suprafata, total: total },
    }));
  };
  const changedModel = (value) => {
    form.setFieldValue("model", value);
    updateFiels(value, form.values.finisaj, form.values.grosime, form.values.culoare, form.values.suprafata);
    if (value) {
      setInputsState((prevState) => ({ ...prevState, finisaj: false }));
    }
  };
  const changedFinisaj = (value) => {
    form.setFieldValue("finisaj", value);
    updateFiels(form.values.model, value, form.values.grosime, form.values.culoare, form.values.suprafata);
    if (value) {
      setInputsState((prevState) => ({ ...prevState, grosime: false }));
    }
  };
  const changedGrosime = (value) => {
    form.setFieldValue("grosime", value);
    updateFiels(form.values.model, form.values.finisaj, value, form.values.culoare, form.values.suprafata);
    if (value) {
      setInputsState((prevState) => ({ ...prevState, culoare: false }));
    }
  };
  const changedCuloare = (value) => {
    form.setFieldValue("culoare", value);
    updateFiels(form.values.model, form.values.finisaj, form.values.grosime, value, form.values.suprafata);
  };
  const changedSuprafata = (value) => {
    form.setFieldValue("suprafata", value);
    //form.setFieldValue("total", form.values.pret * form.values.suprafata);
    updateFiels(form.values.model, form.values.finisaj, form.values.grosime, form.values.culoare, value);
  };
  const handleSubmit = (values) => {
    console.log(values);
    nextStep();
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Model"
          description="Selectează un model"
          placeholder="Selectează"
          data={modele}
          onChange={changedModel}
          value={form.values.model}
          error={form.getInputProps("model").error}
        />
        <Select
          label="Finisaj"
          description="Selectează finisajul"
          placeholder="Selectează"
          data={finisaje}
          onChange={changedFinisaj}
          disabled={inputsState.finisaj}
          value={form.values.finisaj}
          error={form.getInputProps("finisaj").error}
        />
        <Select
          label="Grosime"
          description="Selectează grosimea"
          placeholder="Selectează"
          data={grosimi}
          onChange={changedGrosime}
          disabled={inputsState.grosime}
          value={form.values.grosime}
          error={form.getInputProps("grosime").error}
        />
        <Select
          label="Culoare"
          description="Selectează culoarea"
          placeholder="Selectează"
          data={culori}
          onChange={changedCuloare}
          disabled={inputsState.culoare}
          value={form.values.culoare}
          error={form.getInputProps("culoare").error}
        />
        <NumberInput
          styles={{
            input: { fontSize: 14, fontWeight: "bold" },
            disabled: { color: "#000000 !important" },
          }}
          defaultValue={0}
          precision={2}
          label="Pret"
          description="Preț / metru pătrat cu TVA"
          placeholder="Preț"
          disabled
          value={form.values.pret}
        />
        <NumberInput
          defaultValue={0}
          precision={2}
          min={0}
          label="Suprafata"
          description="Introdu cantitatea de metri pătrați"
          placeholder="Introdu cantitatea"
          onChange={changedSuprafata}
          value={form.values.suprafata}
          error={form.getInputProps("suprafata").error}
        />
        <NumberInput
          styles={{
            input: { fontSize: 14, fontWeight: "bold" },
            disabled: { color: "#000000 !important" },
          }}
          defaultValue={0}
          precision={2}
          label="Total"
          description="Total cu TVA"
          placeholder="Total"
          disabled
          value={form.values.total}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Înapoi
          </Button>
          <Button type="submit">Următorul pas</Button>
        </Group>
      </form>
    </>
  );
};

export default Tigla;