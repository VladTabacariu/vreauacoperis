import { List, ThemeIcon, Text, Group, Center, Container, Table, Button } from "@mantine/core";
import { CircleCheck, CircleDashed } from "tabler-icons-react";
import { randomId } from "@mantine/hooks";

function Total({ oferta, nextStep, prevStep }) {
  console.log(oferta);
  return (
    <>
      <Container>
        <Text variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }} size="lg" weight={700} align="center">
          Felicitari! Ai completat toti pasii!
        </Text>
        <Text color="dimmed" size="sm" weight={600} align="center">
          Lista tuturor materialelor selectate de tine sunt in tabelul de mai jos. Verifica daca ai adaugat tot ce ai nevoie pentru acoperisul tau!
        </Text>
        <Table verticalSpacing="md" striped>
          <thead>
            <tr>
              <th>
                <Text>Denumire</Text>
              </th>
              <th>
                <Text>Cantitate</Text>
              </th>
              <th>
                <Text>Pret</Text>
              </th>
              <th>
                <Text>Total</Text>
              </th>
            </tr>
          </thead>
          <thead>
            <tr colSpan={4}>
              <th>
                <Text weight={700} align="left">
                  Tigla metalica
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={randomId()}>
              <td>
                <Text weight={400}>{oferta.tigla.model + " " + oferta.tigla.finisaj + " " + oferta.tigla.grosime + " " + oferta.tigla.culoare}</Text>
              </td>
              <td>
                <Text>{oferta.tigla.suprafata + " mp"}</Text>
              </td>
              <td>
                <Text>{oferta.tigla.pret.toFixed(2)}</Text>
              </td>
              <td>
                <Text>{oferta.tigla.total.toFixed(2)}</Text>
              </td>
            </tr>
          </tbody>
          {oferta.piese_finisaj.total > 0 && (
            <>
              <thead>
                <tr>
                  <th colSpan={4}>
                    <Text weight={700} align="left">
                      Piese de finisaj
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {oferta.piese_finisaj.piese.map((item) => (
                  <tr key={item.key}>
                    <td>
                      <Text>{item.nume}</Text>
                    </td>
                    <td>
                      <Text>{item.cantitate + " buc"}</Text>
                    </td>
                    <td>
                      <Text>{item.pret.toFixed(2)}</Text>
                    </td>
                    <td>
                      <Text>{item.total.toFixed(2)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
          {oferta.accesorii.total > 0 && (
            <>
              <thead>
                <tr>
                  <th colSpan={4}>
                    <Text weight={700} align="left">
                      Accesorii
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {oferta.accesorii.elemente.map((item) => (
                  <tr key={item.key}>
                    <td>
                      <Text>{item.nume}</Text>
                    </td>
                    <td>
                      <Text>{item.cantitate + " buc"}</Text>
                    </td>
                    <td>
                      <Text>{item.pret.toFixed(2)}</Text>
                    </td>
                    <td>
                      <Text>{item.total.toFixed(2)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
          {oferta.sistem_pluvial.total > 0 && (
            <>
              <thead>
                <tr>
                  <th colSpan={4}>
                    <Text weight={700} align="left">
                      {"Sistem pluvial - " + oferta.sistem_pluvial.dimensiune.toLowerCase() + " " + oferta.sistem_pluvial.culoare}
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {oferta.sistem_pluvial.elemente.map((item) => (
                  <tr key={item.key}>
                    <td>
                      <Text>{item.nume}</Text>
                    </td>
                    <td>
                      <Text>{item.cantitate + " buc"}</Text>
                    </td>
                    <td>
                      <Text>{item.pret.toFixed(2)}</Text>
                    </td>
                    <td>
                      <Text>{item.total.toFixed(2)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
          {oferta.ferestre_mansarda.total > 0 && (
            <>
              <thead>
                <tr>
                  <th colSpan={4}>
                    <Text weight={700} align="left">
                      Ferestre mansarda
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {oferta.ferestre_mansarda.elemente.map((item) => (
                  <tr key={item.key}>
                    <td>
                      <Text>{item.nume + " " + item.dimensiune}</Text>
                    </td>
                    <td>
                      <Text>{item.cantitate + " buc"}</Text>
                    </td>
                    <td>
                      <Text>{item.pret.toFixed(2)}</Text>
                    </td>
                    <td>
                      <Text>{item.total.toFixed(2)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
          <thead>
            <tr>
              <th colSpan={4}>
                <Text weight={700}>TOTAL GENERAL</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={randomId()}>
              <td colSpan={4}>
                <Text align="center">
                  {(oferta.tigla.total + oferta.piese_finisaj.total + oferta.accesorii.total + oferta.sistem_pluvial.total + oferta.ferestre_mansarda.total).toFixed(2)}
                </Text>
              </td>
            </tr>
          </tbody>
        </Table>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Înapoi
          </Button>
        </Group>
      </Container>
    </>
  );
}

export default Total;
