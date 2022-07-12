import React from "react";
import { Group, Text, ThemeIcon, Anchor, ActionIcon } from "@mantine/core";
import { Mail, Phone, BrandFacebook } from "tabler-icons-react";

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
      <Text size="sm" weight={500} variant="link" component="a" href="tel:0745054808">
        0745054808
      </Text>
      <Anchor href="https://www.facebook.com/vreauacoperis.ro" target="_blank">
        <ThemeIcon size="sm" radius="lg">
          <BrandFacebook size={18} />
        </ThemeIcon>
      </Anchor>
    </Group>
  );
}

export default ContactBanner;
