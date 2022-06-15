import { Container, Stepper, Button, Group } from "@mantine/core";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import jsonata from "jsonata";

const catcosta = (props) => {
  console.log(jsonata("carouselData.Proprietati.model").evaluate(props));

  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Container>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create an account" allowStepSelect={active > 0}>
            Step 1 content: Create an account
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
  const { data: carouselData, error: carouselError } = await supabase.from("BILKA_PRODUCTS").select();

  return {
    props: {
      carouselData,
      carouselError,
    },
  };
};
