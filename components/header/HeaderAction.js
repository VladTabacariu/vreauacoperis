import Links from "./Links.js";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo/VreauAcoperis-LogoOrizontal.png";
import { ChevronDown } from "tabler-icons-react";
import { createStyles, Menu, Center, Header, Container, Group, Button, Burger, Drawer } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import ContactBanner from "../contact/ContactBanner.js";

const HEADER_HEIGHT = 110;
const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
  logo: {
    width: 250,
    [theme.fn.smallerThan("sm")]: {
      width: 180,
    },
  },
}));

const HeaderAction = () => {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const items = Links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Link key={item.link} href={item.link} passHref>
        <Menu.Item key={item.link}>
          <a>{item.label}</a>
        </Menu.Item>
      </Link>
    ));
    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="click"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link}>
        <a className={classes.link}>{link.label}</a>
      </Link>
    );
  });
  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
          <Center>
            <Container className={classes.logo}>
              <Link href="/">
                <a>
                  <Image src={logo} layout="intrinsic" objectFit="contain" alt="Logo" />
                </a>
              </Link>
            </Container>
          </Center>
        </Group>
        <Group direction="column" spacing={5} className={classes.links}>
          <Container fluid sx={{ width: "100%" }} px="lg">
            <ContactBanner />
          </Container>
          <Group>{items}</Group>
        </Group>
        <Link href="/catcosta" passHref>
          <Button variant="outline" radius="xl" sx={{ height: 30 }}>
            <a>Cât costă?</a>
          </Button>
        </Link>
      </Container>
      <Drawer opened={opened} onClose={() => toggleOpened()} title="Menu" padding="xl" size="sm">
        <Link href="/">
          <a>
            <Image src={logo} layout="intrinsic" objectFit="contain" alt="Logo" />
          </a>
        </Link>
        {items}
      </Drawer>
    </Header>
  );
};

export default HeaderAction;
