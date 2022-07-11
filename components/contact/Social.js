import { BrandWhatsapp } from "tabler-icons-react";
import { Fragment } from "react";
import { createStyles, ThemeIcon, Anchor, Group } from "@mantine/core";
import Script from "next/script";

const useStyles = createStyles((theme) => ({
  social: {
    position: "fixed",
    right: "40px",
    bottom: "40px",
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
        <div>
          <div id="fb-root"></div>

          <div id="fb-customer-chat" className="fb-customerchat"></div>
          <Fragment>
            <Script id="fb-messenger" strategy="afterInteractive">
              {`
      var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "110227004505017");
      chatbox.setAttribute("attribution", "biz_inbox");
      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v14.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/ro_RO/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      `}
            </Script>
          </Fragment>
        </div>
      </Group>
    </>
  );
}

export default Social;
