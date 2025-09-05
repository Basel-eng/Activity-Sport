import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  public async sendLogInEmail(email: string) {
    try {
      const today = new Date();

      await this.mailerService.sendMail({
        to: email,
        from: `<no-reply@my-nestjs-app.com>`,
        subject: 'log in',
        template: 'login',
        context: { email, today },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }
  public async sendVeryfyEmailTemplate(email: string, link: string) {
    try {
      const today = new Date();

      await this.mailerService.sendMail({
        to: email,
        from: `<no-reply@my-nestjs-app.com>`,
        subject: 'verfy-email',
        template: 'login',
        context: { link, email, today },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }

  public async sendResetPassword(email: string, resetPasswordLink: string) {
    try {
      const today = new Date();

      await this.mailerService.sendMail({
        to: email,
        from: `<no-reply@my-nestjs-app.com>`,
        subject: 'Reset Password',
        template: 'reset-password',
        context: { resetPasswordLink, today },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }
}
