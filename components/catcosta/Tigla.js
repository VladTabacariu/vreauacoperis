import { Select, NumberInput, TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState, useRef } from "react";
import jsonata from "jsonata";

const Tigla = (props) => {
  console.log(props);
  const [inputsState, setInputsState] = useState({
    finisaj: !props.oferta.tigla.finisaj,
    grosime: !props.oferta.tigla.grosime,
    culoare: !props.oferta.tigla.culoare,
  });

  const modele = jsonata("$distinct(products[grup='tabla'].props.model)").evaluate(props);
  const [finisaje, setFinisaje] = useState([]);
  const [grosimi, setGrosimi] = useState([]);
  const [culori, setCulori] = useState([]);

  const form = useForm({
    initialValues: {
      model: "",
      finisaj: "",
      grosime: "",
      culoare: "",
      pret: 0,
      suprafata: 0,
      total: 0,
    },
  });
  const updateFiels = (model, finisaj, grosime, culoare) => {
    console.log(model, finisaj, grosime, culoare);
    const finisaje = [];
    const grosimi = [];
    const culori = [];
    const pret = 0;
    const total = 0;

    finisaje = jsonata("$distinct(products[grup='tabla'].props[model='" + model + "'][].finisaj)").evaluate(props);
    grosimi = jsonata("$distinct(products[grup='tabla'].props[(model='" + model + "') and (finisaj='" + finisaj + "')][].grosime)").evaluate(props);
    culori = jsonata("$distinct(products[grup='tabla'].props[(model='" + model + "') and (finisaj='" + finisaj + "') and (grosime='" + grosime + "')][].culori)").evaluate(
      props
    );
    pret = jsonata(
      "products[(grup='tabla') and (props.model='" + model + "') and (props.finisaj='" + finisaj + "') and (props.grosime='" + grosime + "')].pret_lista"
    ).evaluate(props);
    total = form.values.suprafata * pret;
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
    console.log(form.values);
  };
  const changedModel = (value) => {
    form.setFieldValue("model", value);
    updateFiels(value, form.values.finisaj, form.values.grosime, form.values.culoare);
    if (value) {
      setInputsState((prevState) => ({ ...prevState, finisaj: false }));
    }
  };
  const changedFinisaj = (value) => {
    form.setFieldValue("finisaj", value);
    updateFiels(form.values.model, value, form.values.grosime, form.values.culoare);
    if (value) {
      setInputsState((prevState) => ({ ...prevState, grosime: false }));
    }
  };
  const changedGrosime = (value) => {
    form.setFieldValue("grosime", value);
    updateFiels(form.values.model, form.values.finisaj, value, form.values.culoare);
    if (value) {
      setInputsState((prevState) => ({ ...prevState, culoare: false }));
    }
  };
  const changedCuloare = (value) => {
    form.setFieldValue("culoare", value);
    updateFiels(form.values.model, form.values.finisaj, form.values.grosime, value);
  };
  const changedSuprafata = (value) => {
    form.setFieldValue("suprafata", value);
    form.setFieldValue("total", form.values.pret * form.values.suprafata);
  };
  return (
    <>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Select label="Model" description="Selectează un model" placeholder="Selectează" data={modele} onChange={changedModel} value={form.values.model} />
        <Select
          label="Finisaj"
          description="Selectează finisajul"
          placeholder="Selectează"
          data={finisaje}
          onChange={changedFinisaj}
          disabled={inputsState.finisaj}
          value={form.values.finisaj}
        />
        <Select
          label="Grosime"
          description="Selectează grosimea"
          placeholder="Selectează"
          data={grosimi}
          onChange={changedGrosime}
          disabled={inputsState.grosime}
          value={form.values.grosime}
        />
        <Select
          label="Culoare"
          description="Selectează culoarea"
          placeholder="Selectează"
          data={culori}
          onChange={changedCuloare}
          disabled={inputsState.culoare}
          value={form.values.culoare}
        />
        <NumberInput defaultValue={0} precision={2} label="Pret" description="Preț / metru pătrat cu TVA" placeholder="Preț" disabled value={form.values.pret} />
        <NumberInput
          defaultValue={0}
          precision={2}
          label="Suprafata"
          description="Introdu cantitatea de metri pătrați"
          placeholder="Introdu cantitatea"
          onChange={changedSuprafata}
          value={form.values.suprafata}
        />
        <NumberInput defaultValue={0} precision={2} label="Total" description="Total cu TVA" placeholder="Total" disabled value={form.values.total} />
      </form>
    </>
  );
};

export default Tigla;
