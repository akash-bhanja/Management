import { Controller, Get, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('send')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'recipient@example.com' },
        subject: { type: 'string', example: 'Test Email' },
        text: { type: 'string', example: 'This is a test email.' }
      }
    }
  })
  sendMail(@Body() body: any) {
    return this.mailService.sendMail(
      body.to,
      body.subject,
      body.text
    );
  }

  // ✅ Fetch All Emails from Inbox
  @Get('inbox')
  getInbox() {
    return this.mailService.fetchInbox();
  }

  // ✅ Fetch Only Unread Emails (Optional)
  // @Get('unread')
  // getUnreadEmails() {
  //   return this.mailService.fetchUnreadEmails();
  // }

  @Post('generate-otp')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' }
      }
    }
  })
  otpGenerate(@Body() body:any) {
    return this.mailService.generateOTP(body.email);

  }
    @Post('verify-otp')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'user@example.com' }, 
          otp: { type: 'string', example: '123456' }
        }
      }
  })
  otpVerify(@Body() body:any) {
    return this.mailService.verifyOTP(body.email, body.otp);
  }
}