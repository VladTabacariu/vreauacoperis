import React, { useState } from "react";
import { Container, Stepper, Button, Group, Text } from "@mantine/core";
import { supabase } from "../utils/supabaseClient";
import Tigla from "../components/catcosta/Tigla.js";
import PieseFinisaj from "../components/catcosta/PieseFinisaj.js";
import Accesorii from "../components/catcosta/Accesorii.js";
import SistemPluvial from "../components/catcosta/SistemPluvial.js";
import FerestreMansarda from "../components/catcosta/FerestreMansarda.js";
import Total from "../components/catcosta/Total.js";
import { randomId } from "@mantine/hooks";

const Catcosta = (props) => {
  console.log(props);
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
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
    piese_finisaj: {
      finisaj: "MAT",
      grosime: "0.50",
      culoare: "3005",
      total: 0,
      piese: [{ nume: "COAMA MICA", cantitate: 1, pret: 7, total: 7, key: randomId() }],
    },
    accesorii: {
      elemente: [
        {
          nume: "FOLIE ANTICONDENS 95GR",
          pret: 2,
          cantitate: 1,
          total: 2,
          key: randomId(),
        },
      ],
      total: 2,
    },
    sistem_pluvial: {
      dimensiune: "SISTEM MIC",
      culoare: "3005",
      elemente: [
        {
          nume: "JGHEAB 4M",
          pret: 2,
          cantitate: 2,
          total: 4,
          key: randomId(),
        },
      ],
      total: 4,
    },
    ferestre_mansarda: {
      elemente: [{ nume: "FEREASTRA PREMIUM FTP V U5", dimensiune: "55x98", pret: 2, cantitate: 2, total: 4, key: randomId() }],
      total: 4,
    },
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
            <SistemPluvial oferta={oferta} setOferta={setOferta} products={props.productsData} nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Step>
          <Stepper.Step label="Ferestre mansarda" description="Ferestre mansarda" allowStepSelect={active > 4}>
            <FerestreMansarda oferta={oferta} setOferta={setOferta} products={props.productsData} nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Step>
          <Stepper.Completed>
            <Total oferta={oferta} nextStep={nextStep} prevStep={prevStep} />
          </Stepper.Completed>
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
