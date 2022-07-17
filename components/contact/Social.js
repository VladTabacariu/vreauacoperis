import { BrandWhatsapp, BrandMessenger } from "tabler-icons-react";
import { Fragment } from "react";
import { createStyles, ThemeIcon, Anchor, Group } from "@mantine/core";
import Script from "next/script";

const useStyles = createStyles((theme) => ({
  social: {
    position: "fixed",
    right: "40px",
    bottom: "20px",
    zIndex: 100,
  },
}));

function Social() {
  const { classes } = useStyles();
  return (
    <>
      <Group className={classes.social}>
        <Anchor href="https://wa.me/40745054808" target="_blank">
          <ThemeIcon color="green" radius="xl" size={56}>
            <BrandWhatsapp />
          </ThemeIcon>
        </Anchor>
        <Anchor href="https://m.me/110227004505017" target="_blank">
          <ThemeIcon color="blue" radius="xl" size={56}>
            <BrandMessenger />
          </ThemeIcon>
        </Anchor>
      </Group>
    </>
  );
}

export default Social;
