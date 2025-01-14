import email from "nodemailer";
export class ServerSmtpConnection {
  static async serverSmtp() {
    try {
      const transporter = email.createTransport({
        host: process.env.SMTP_SERVER,
        port: 465, // ou 465 para TLS
        secure: true, // true para 465, false para outros
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      return transporter;
    } catch (error) {
      throw error;
    }
  }
}
