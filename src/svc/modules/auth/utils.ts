import jwt from "jsonwebtoken";
import { IAuthenticationPayload } from "~src/svc/modules/auth/types";
import { conf } from "~src/config/settings";
import { ForgotPasswordEmail, SignupEmail } from "~src/svc/modules/auth/constants";
import { EmailClient } from "~src/clients/email";

export const generateToken = (email_id: string, name: string, role: string) => {
  let payload: IAuthenticationPayload = {
    email_id: email_id,
    name: name,
  };
  if (role) {
    payload = { ...payload, iad: "IAD" };
  }

  const options = { expiresIn: parseInt(conf.JWT_EXPIRES_IN) * 30 || "30d" };
  return jwt.sign(payload, conf.JWT_SECRET_KEY, options);
};

export const generateForgotPasswordToken = (email_id: string) => {
  const options = { expiresIn: parseInt(conf.JWT_EXPIRES_IN) };
  return jwt.sign({ email_id }, conf.JWT_SECRET_KEY, options);
};

export const sendForgotPasswordEmail = async (emailId: string, token: string) => {
  const mailOptions = {
    from: ForgotPasswordEmail.FROM,
    to: emailId,
    subject: ForgotPasswordEmail.SUBJECT,
    text: `${ForgotPasswordEmail.BODY} ${conf.FRONTEND_URL}/reset-password?token=${token}`,
  };

  const emailClient = new EmailClient();
  await emailClient.sendEmail(mailOptions);
};

export const sendSignupEmail = async (
  email: string,
  name: string,
  password: string,
) => {
  const mailOptions = {
    from: SignupEmail.FROM,
    to: email,
    subject: SignupEmail.SUBJECT(name),
    html: SignupEmail.BODY(name, email, password),
    bcc: SignupEmail.BCC,
  };

  const emailClient = new EmailClient();
  await emailClient.sendEmail(mailOptions);
};

export const generateRandomPassword = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
};
