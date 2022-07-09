import React from "react";
import { Paper, Text, TextInput, Box, Textarea, Button, Group, SimpleGrid, createStyles } from "@mantine/core";
import { ContactIconsList } from "../components/contacticons/ContactIcons.js";

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

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

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

    control: {
      [BREAKPOINT]: {
        flex: 1,
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

          <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
            <Text size="lg" weight={700} className={classes.title}>
              Contacteaza-ne!
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput label="Numele tau" placeholder="Numele tau" />
                <TextInput label="Emailul tau" placeholder="exemplu@email.ro" required />
              </SimpleGrid>

              <TextInput mt="md" label="Subiect" placeholder="Subiect" required />

              <Textarea mt="md" label="Mesajul tau" placeholder="Mesaj..." minRows={3} />

              <Group position="right" mt="md">
                <Button type="submit" className={classes.control}>
                  Trimite mesaj
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Box>
  );
}

export default Contact;
