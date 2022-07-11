import React from "react";
import { Button, Paper, Text, Group, CloseButton } from "@mantine/core";

export function CookiesBanner() {
  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group position="apart" mb="xs">
        <Text size="md" weight={500}>
          Accepta cookie
        </Text>
        <CloseButton mr={-9} mt={-9} />
      </Group>
      <Text color="dimmed" size="xs">
        Folosim cookie-uri pentru a vă asigura cea mai bună experiență pe website-ul nostru. Dacă veți continua navigarea, presupunem ca
        sunteți de acord cu acestea.
      </Text>
      <Group position="right" mt="xs">
        <Button variant="outline" size="xs">
          Accept
        </Button>
      </Group>
    </Paper>
  );
}
