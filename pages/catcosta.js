import React, { useState } from "react";
import { Container, Stepper, Button, Group, Text } from "@mantine/core";
import { supabase } from "../utils/supabaseClient";
import Tigla from "../components/catcosta/Tigla.js";
import PieseFinisaj from "../components/catcosta/PieseFinisaj";
import Accesorii from "../components/catcosta/Accesorii";
import { randomId } from "@mantine/hooks";

const Catcosta = (props) => {
  console.log(props);
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [oferta, setOferta] = useState({
    producator: "",
    tigla: {
      model: "CLASIC",
      finisaj: "MAT",
      grosime: "0.50",
      culoare: "3005",
      suprafata: 200,
      pret: 1,
      total: 200,
    },
    piese_finisaj: { finisaj: "MAT", grosime: "0.50", culoare: "3005", total: 0, piese: [{ nume: "COAMA MICA", cantitate: 1, pret: 7, total: 7, key: randomId() }] },
    accesorii: [
      {
        nume: "",
        pret: 0,
        cantitate: 0,
        total: 0,
      },
    ],
    sistem_pluvial: [
      {
        nume: "",
        dimensiune: "",
        culoare: "",
        pret: 0,
        cantitate: 0,
        total: 0,
      },
    ],
    ferestre_mansarda: [{ nume: "", dimensiune: "", pret: 0, cantitate: 0, total: 0 }],
  });

  return (
    <>
      <Container>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Tigla" description="Alege tigla metalica" allowStepSelect={active > 0}>
            <Tigla oferta={oferta} setOferta={setOferta} products={props.productsData} nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Step>
          <Stepper.Step label="Piese de finisaj" description="Piese de finisaj tigla metalica" allowStepSelect={active > 1}>
            <PieseFinisaj oferta={oferta} setOferta={setOferta} products={props.productsData} nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Step>
          <Stepper.Step label="Accesorii" description="Accesorii auxiliare" allowStepSelect={active > 2}>
            <Accesorii oferta={oferta} setOferta={setOferta} products={props.productsData} nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Step>
          <Stepper.Step label="Sistem pluvial" description="Sistem pluvial" allowStepSelect={active > 3}>
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Step label="Ferestre mansarda" description="Ferestre mansarda" allowStepSelect={active > 3}>
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
        </Stepper>
      </Container>
    </>
  );
};

export default Catcosta;

export const getServerSideProps = async () => {
  const { data: productsData, error: productsError } = await supabase.from("TIGLA").select();

  return {
    props: {
      productsData,
      productsError,
    },
  };
};
