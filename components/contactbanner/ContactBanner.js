import React from "react";
import { Group, Text, ThemeIcon } from "@mantine/core";
import { Mail, Phone } from "tabler-icons-react";

function ContactBanner() {
  return (
    <Group position="right">
      <ThemeIcon size="sm" radius="lg">
        <Mail size={14} />
      </ThemeIcon>
      <Text size="sm" weight={500} variant="link" component="a" href="mailto:office@vreauacoperis.ro">
        office@vreauacoperis.ro
      </Text>
      <ThemeIcon size="sm" radius="lg">
        <Phone size={14} />
      </ThemeIcon>
      <Text size="sm" weight={500} variant="link" component="a" href="tel:0787629175">
        0787629175
      </Text>
    </Group>
  );
}

export default ContactBanner;
