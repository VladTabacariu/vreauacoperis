import React from "react";
import { createStyles, Text, Anchor, Group, ActionIcon } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";
import { Links } from "./Links.js";
import logo from "../../public/logo/VreauAcoperis-LogoOrizontal.png";
import Image from "next/image";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

function Footer() {
  const { classes } = useStyles();
  const items = Links.map((link) => (
    <Link key={link.label} href={link.link} passHref>
      <Text color="dimmed" component="a">
        {link.label}
      </Text>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Link href="/">
          <a>
            <Image src={logo} width={100} height={100} layout="intrinsic" objectFit="contain" alt="Logo" />
          </a>
        </Link>

        <Group className={classes.links}>{items}</Group>

        <Group spacing={0} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}

export default Footer;
