import { Select, NumberInput, TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import jsonata from "jsonata";

function PieseFinisaj({ oferta, setOferta, products, nextStep, prevStep }) {
  const form = useForm({
    initialValues: { ...oferta.piese_finisaj },
  });

  const handleSubmit = (values) => {
    console.log(values);
    nextStep();
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
