import nodemailer, { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { conf } from "~src/config/settings";

export class EmailClient {
  #transporter: Transporter;

  constructor(
    transportOptions: Partial<{
      host: string;
      port: string | number;
      user: string;
      password: string;
    }> = {},
  ) {
    const {
      host = conf.SMTP_HOST,
      port = conf.SMTP_PORT,
      user = conf.SMTP_MAIL,
      password = conf.SMTP_PASSWORD,
    } = transportOptions;

    this.#transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: true,
      auth: {
        user,
        pass: password,
      },
    });
  }

  async sendEmail(emailOptions: Mail.Options) {
    await this.#transporter.sendMail(emailOptions);
  }
}
