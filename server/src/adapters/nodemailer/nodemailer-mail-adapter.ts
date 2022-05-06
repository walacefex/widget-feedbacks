import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "06cc6d3f7c5508",
    pass: "ca183ddff3f38e"
  }
});

export class NodemailerMailAdapter implements MailAdapter {

  async sendMail ({subject, body}: SendMailData){
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Walace Felix <walacefex01@gmail.com>',
      subject,
      html: body,
    });
  }
}