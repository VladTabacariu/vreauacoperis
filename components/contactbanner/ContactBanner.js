import React from "react";
import { Group, Text, ThemeIcon } from "@mantine/core";
import { Mail, Phone } from "tabler-icons-react";

function ContactBanner() {
  return (
    <Group position="right">
      <ThemeIcon size="sm">
        <Mail size={14} />
      </ThemeIcon>

      <Text size="xs" weight={500}>
        office@vreauacoperis.ro
      </Text>
      <ThemeIcon size="sm">
        <Phone size={14} />
      </ThemeIcon>
      <Text size="xs" weight={500}>
        0742015698
      </Text>
    </Group>
  );
}

export default ContactBanner;
