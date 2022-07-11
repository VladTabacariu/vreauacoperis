import React from "react";
import { Paper, Text, Box, createStyles } from "@mantine/core";
import { ContactIconsList } from "../components/contact/ContactIcons.js";
import ContacForm from "../components/contact/ContactForm.js";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      display: "flex",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2]}`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg - 2,
      backgroundImage: `url(/assets/bg.svg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: theme.spacing.xl,
      flex: "0 0 280px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },
  };
});

function Contact() {
  const { classes } = useStyles();
  return (
    <Box sx={{ maxWidth: 800 }} mx="auto">
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <Text size="lg" weight={700} className={classes.title} sx={{ color: "#fff" }}>
              Contact
            </Text>
            <ContactIconsList variant="white" />
          </div>
          <ContacForm title="Contacteaza-ne" />
        </div>
      </Paper>
    </Box>
  );
}

export default Contact;
