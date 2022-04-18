import { createStyles, Overlay, Container, Title, Button, Text, keyframes } from "@mantine/core";
import Link from "next/link";
import shape from "../../public/assets/images/shape-1.png";
import banner from "../../public/assets/images/banner-4.jpg";

const slide = keyframes({
  "0%": { backgroundPosition: "1000px 0" },
  "100%": { backgroundPosition: "0 0" },
});

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: `url(${banner.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  pattern: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundImage: `url(${shape.src})`,
    height: 35,
    zIndex: 10,
    backgroundRepeat: "repeat-x",
    animation: `${slide} 60s linear infinite`,
  },
}));

const Hero = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 80%)" opacity={1} zIndex={0} />
      <Container className={classes.container}>
        <Title className={classes.title}>Cât ne costă acoperișul,</Title>
        <Title className={classes.title}>din țiglă metalică?</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Atunci când începem să construim casa noastră apare întrebarea &quot;Cât ne costă acoperișul?&quot; Apasă butonul de mai jos si urmărește
          toți pașii!
        </Text>
        <Link href="/catcosta">
          <a>
            <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
              Hai să aflăm!
            </Button>
          </a>
        </Link>
      </Container>
      <div className={classes.pattern}></div>
    </div>
  );
};

export default Hero;
