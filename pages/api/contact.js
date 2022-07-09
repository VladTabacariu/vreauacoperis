export default function handler(req, res) {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "office.vreauacoperis.ro@gmail.com",
      pass: "iirnziauovzpfdqb",
    },
    secure: true,
  });
  const mailData = {
    from: "vreauacoperis.ro <office.vreauacoperis.ro@gmail.com>",
    to: "office.vreauacoperis.ro@gmail.com;",
    subject: `Mesaj de la ${req.body.nume}`,
    text: req.body.mesaj + " | Sent from: " + req.body.email,
    html: `<div>${req.body.mesaj}</div><div>Telefon: ${req.body.telefon}</div><p>Sent from:
    ${req.body.email}</p>`,
  };
  const mailDataVisitor = {
    from: "vreauacoperis.ro <office.vreauacoperis.ro@gmail.com>",
    to: req.body.email,
    subject: "Multumim pentru mesaj",
    text: "Mesajul tau a fost receptionat. Multumim!",
    html: `<div>Mesajul tau a fost receptionat. Multumim!</div>`,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else {
      transporter.sendMail(mailDataVisitor, function (err, info) {
        if (err) {
          console.log(err);
          res.status(300).send("notok");
        } else {
          console.log(info);
          res.status(200).send("ok");
        }
      });
      console.log(info);
    }
  });
  console.log(req.body);
}
