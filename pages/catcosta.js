import { Container, Stepper, Button, Group } from "@mantine/core";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import jsonata from "jsonata";
import Tigla from "../components/catcosta/Tigla.js";

const catcosta = (props) => {
  console.log(props);

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const oferta = {
    producator: "",
    tigla: {
      model: "",
      finisaj: "",
      grosime: "",
      culoare: "",
      mp: 0,
      pret: 0,
      total: 0,
    },
    piese_finisaj: { finisaj: "", grosime: "", culoare: "", piese: [{ nume: "", pret: 0, cantitate: 0, total: 0 }] },
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
  };

  return (
    <>
      <Container>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Tigla" description="Alege tigla metalica" allowStepSelect={active > 0}>
            <Tigla oferta={oferta} products={props.productsData} />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email" allowStepSelect={active > 1}>
            Step 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access" allowStepSelect={active > 2}>
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Înapoi
          </Button>
          <Button onClick={nextStep}>Următorul pas</Button>
        </Group>
      </Container>
    </>
  );
};

export default catcosta;

export const getServerSideProps = async () => {
  const { data: productsData, error: productsError } = await supabase.from("TIGLA").select();

  return {
    props: {
      productsData,
      productsError,
    },
  };
};
