import { MailAdapter, SendMailData } from "../adpters/mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d867a47c18f1af",
    pass: "65118ca8637e5b"
  }
});


export class NodemailerMailAdpater implements MailAdapter {

  async sendMail({ subject, body }: SendMailData) {


    await transport.sendMail({
      from: 'Equipe Feedget <oi@deedget.com>',
      to: 'Jonas Alberton <jonasceolin@gmail.com>',
      subject,
      html: body
    })
  }
}