import { Select, NumberInput, Button, Group, Box, Text, createStyles, ActionIcon, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm, formList } from "@mantine/form";
import jsonata from "jsonata";

function Accesorii({ oferta, setOferta, products, nextStep, prevStep }) {
  const form = useForm({});
  const handleSubmit = (values) => {
    console.log(values);
    nextStep();
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}></form>
    </>
  );
}

export default Accesorii;
