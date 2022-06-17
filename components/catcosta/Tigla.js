import { Select, NumberInput, TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
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
  const modelRef = useRef(null);
  const finisajRef = useRef(null);
  const grosimeRef = useRef(null);
  console.log(grosimeRef.current);
  const [grosimi, setGrosimi] = useState([]);
  const [culori, setCulori] = useState([]);
  const modele = jsonata("$distinct(products[grup='tabla'].props.model)").evaluate(props);
  const finisaje = jsonata("$distinct(products[grup='tabla'].props.finisaj)").evaluate(props);
  const form = useForm({
    initialValues: {
      model: "CLASIC",
      finisaj: "",
      grosime: "",
      culoare: "",
      pret: 0,
    },
  });
  const changedModel = (value) => {
    form.setFieldValue("model", value);
    if (value) {
      console.log(value);
      const grosimi = jsonata("$distinct(products[grup='tabla'].props[model='" + value + "'].grosime)").evaluate(props);
      setInputsState((prevState) => ({ ...prevState, finisaj: false }));
      setGrosimi(grosimi);
      form.setFieldValue("finisaj", "MAT");
    }
  };
  const changedFinisaj = (value) => {
    form.setFieldValue("finisaj", value);
    if (value) {
      console.log(value);
      setInputsState((prevState) => ({ ...prevState, grosime: false }));
      setGrosimi(
        jsonata(
          "$distinct(products[grup='tabla'].props[(model='" +
            modelRef.current.value +
            "') and (finisaj='" +
            value +
            "')][].grosime)"
        ).evaluate(props)
      );
    }
  };
  const changedGrosime = (value) => {
    form.setFieldValue("grosime", value);
    if (value) {
      setInputsState((prevState) => ({ ...prevState, culoare: false }));
      setCulori(
        jsonata(
          "$distinct(products[grup='tabla'].props[(model='" +
            modelRef.current.value +
            "') and (finisaj='" +
            finisajRef.current.value +
            "') and (grosime='" +
            value +
            "')][].culori)"
        ).evaluate(props)
      );
    }
  };
  const changedCuloare = (value) => {
    form.setFieldValue("culoare", value);
  };
  return (
    <>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Select
          label="Model"
          description="Selectează un model"
          placeholder="Selectează"
          data={modele}
          onChange={changedModel}
          ref={modelRef}
          value={form.values.model}
        />
        <Select
          label="Finisaj"
          description="Selectează finisajul"
          placeholder="Selectează"
          data={finisaje}
          onChange={changedFinisaj}
          disabled={inputsState.finisaj}
          ref={finisajRef}
          value={form.values.finisaj}
        />
        <Select
          label="Grosime"
          description="Selectează grosimea"
          placeholder="Selectează"
          data={grosimi}
          onChange={changedGrosime}
          disabled={inputsState.grosime}
          ref={grosimeRef}
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
        <NumberInput defaultValue={0} label="Preț / metru pătrat cu TVA" placeholder="Preț" disabled />
        <NumberInput defaultValue={0} label="Introdu cantitatea de metri pătrați" placeholder="Introdu cantitatea" />
        <NumberInput defaultValue={0} label="Total cu TVA" placeholder="Total" disabled />
      </form>
    </>
  );
};

export default Tigla;
