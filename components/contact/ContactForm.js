import React, { useState } from "react";
import { Text, TextInput, Textarea, Button, Group, SimpleGrid, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { CircleCheck, FaceIdError } from "tabler-icons-react";

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

function ContactForm({ title }) {
  const { classes } = useStyles();
  const [mailState, setMailState] = useState(false);
  const form = useForm({
    initialValues: {
      nume: "",
      email: "",
      telefon: "",
      subiect: "",
      mesaj: "",
    },
    validate: {
      nume: (value) => (value == "" ? "Introdu numele tau" : null),
      email: (value) => (value == "" ? "Introdu adresa de email" : null),
      telefon: (value) => (value == "" ? "Introdu numarul tau de telefon" : null),
      subiect: (value) => (value == "" ? "Te rugam sa introduci un subiect" : null),
      mesaj: (value) => (value == "" ? "Scrie-ne un mesaj" : null),
    },
  });
  const handleSubmit = (values) => {
    console.log(values);
    setMailState(true);
    showNotification({
      id: "load-data",
      loading: true,
      title: "Nu parasi pagina! Mesajul tau se trimite",
      message: "Vei primi o notificare dupa ce mesajul se trimite cu succes!",
      autoClose: false,
      disallowClose: true,
    });
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        console.log("Response succeeded!");
        form.setValues({ nume: "", email: "", telefon: "", subiect: "", mesaj: "" });
        setMailState(false);
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Mesajul a fost trimis",
          message: "Va multumim!",
          icon: <CircleCheck />,
          autoClose: 2000,
        });
      } else {
        setMailState(false);
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Ne pare rau a aparut o problema!",
          message: "Verificati adresa de email si sa incercati din nou!",
          icon: <FaceIdError />,
          autoClose: 2000,
        });
      }
    });
  };
  console.log(form.values);
  return (
    <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
      <Text size="lg" weight={700} className={classes.title}>
        {title}
      </Text>

      <div className={classes.fields}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <TextInput label="Numele tau" placeholder="Numele tau" {...form.getInputProps("nume")} />
          <TextInput label="Emailul tau" placeholder="exemplu@email.ro" {...form.getInputProps("email")} />
          <TextInput label="Telefon" placeholder="0798765432" {...form.getInputProps("telefon")} />
        </SimpleGrid>
        <TextInput mt="md" label="Subiect" placeholder="Subiect" {...form.getInputProps("subiect")} />
        <Textarea mt="md" label="Mesajul tau" placeholder="Mesaj..." minRows={3} {...form.getInputProps("mesaj")} />
        <Group position="right" mt="md">
          <Button type="submit" className={classes.control} disabled={mailState}>
            Trimite mesaj
          </Button>
        </Group>
      </div>
    </form>
  );
}

export default ContactForm;
