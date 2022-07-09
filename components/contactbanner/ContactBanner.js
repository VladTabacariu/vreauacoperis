import React from "react";
import { Container, Group, Text, ActionIcon } from "@mantine/core";
import { Mail, Phone } from "tabler-icons-react";

function ContactBanner() {
  return (
    <Group position="right">
      <Mail size={14} />
      <Text size="xs" weight={500}>
        office@vreauacoperis.ro
      </Text>
      <Phone size={14} />
      <Text size="xs" weight={500}>
        0742015698
      </Text>
    </Group>
  );
}

export default ContactBanner;
