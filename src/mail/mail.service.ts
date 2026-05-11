import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as imaps from 'imap-simple';
import path from 'path/win32';
import fs from 'fs';
import { simpleParser } from 'mailparser';


@Injectable()
export class MailService {
  private imapConfig = {
    imap: {
      user: 'skybabu049@gmail.com',
      password: 'avrovprjpizraaur',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000, 
    },
  };

  private transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'skybabu049@gmail.com',
    pass: 'avrovprjpizraaur',
  },
});


  async sendMail( 
     to: string = 'akashbhanja09@gmail.com', subject: string = 'Default Subject', text: string = 'Default email body' ) {
    try {
      const info = await this.transporter.sendMail({
        from: 'skybabu049@gmail.com',
        to,
        subject,
        text,
        html: `<p>${text}</p>`
      });

      return {
        errorCode: 0, 
        message: 'Email sent successfully', 
         
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        errorCode: 1, 
        message: 'Failed to send email', 
        error: error.message 
      };
    }
  }


//   async fetchInbox() {
//   try {
//     const connection = await imaps.connect(this.imapConfig);

//     await connection.openBox('INBOX');

//     const searchCriteria = ['ALL'];
//     const fetchOptions = {
//       bodies: ['HEADER', 'TEXT'],
//       markSeen: false,
//     };

//     const messages = await connection.search(searchCriteria, fetchOptions);

//     const allMessages = messages.reverse();

//     // const pagedMessages = allMessages.slice(startIndex, endIndex);
//     const parsedEmails = await Promise.all(
//         allMessages.map(async (msg) => {
//           const headerPart = msg.parts.find((p) =>
//             p.which.includes('HEADER.FIELDS'),
//           );
//           const bodyPart = msg.parts.find((p) => p.which === 'TEXT');
//           const header = imaps.getHeaders(headerPart.body);
//           const body = bodyPart ? bodyPart.body : '';
//           return {
//             from: header.from ? header.from[0] : 'Unknown',
//             subject: header.subject ? header.subject[0] : 'No Subject',
//             date: header.date ? header.date[0] : 'Unknown Date',
//             body,
//           };
//         }),
//       );

//     const emails = messages.map((item) => {
//       const header = item.parts.find(part => part.which === 'HEADER');
//       const body = item.parts.find(part => part.which === 'TEXT');

//       return {
//         from: header.body.from[0],
//         subject: header.body.subject[0],
//         date: header.body.date[0],
//         body: body.body,
//       };
//     });

//     return {
//       errorCode: 0,
//       message: 'Emails fetched successfully',
//       data: emails,
//     };

//   } catch (error) {
//     console.error('Fetch mail error:', error);

//     return {
//       errorCode: 1,
//       message: 'Failed to fetch emails',
//       error: error.message,
//     };
//   }
// }


// generate OTP
// private otpExpiryTime:Record<string,{otp: string, expiry: number}> = {};

// async generateOTP(email: string)  {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   const expiry = Date.now() + 5 * 60 * 1000;

//   this.otpExpiryTime[email] = { otp, expiry };

//   await this.transporter.sendMail({
//     from: 'akashbhanja09@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP is: ${otp}`,
//     html: `<p>Your OTP is: <b>${otp}</b></p>`
//   });
//   return { message: 'OTP sent to email' };
// }


async fetchInbox() {
    try {
      const connection = await imaps.connect(this.imapConfig);
      connection.on('error', (err) => {
      console.error('IMAP Error:', err);
      });
      await connection.openBox('INBOX');

      const searchCriteria = ['ALL'];
      const fetchOptions = {
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
        struct: true,
        markSeen: false,
      };

      const messages = await connection.search(searchCriteria,fetchOptions,);
      const allMessages = messages.reverse();
      // LIMIT manually
      const limitedMessages = messages.slice(-20); // last 20 emails only
      // newest first
      
type Email = {
  from: string;
  subject: string;
  date: any;
  body: string;
};
      const parsedEmails: Email[] = [];

      for (const msg of allMessages) {
        const headerPart = msg.parts.find((p) =>
          p.which.includes('HEADER.FIELDS'),
        );
        const bodyPart = msg.parts.find((p) => p.which === 'TEXT');

        const parsed = await simpleParser(bodyPart?.body || '');

        const subject =
          parsed.subject ||
          headerPart?.body?.subject?.[0] ||
          '(no subject)';

        const from =
          parsed.from?.text ||
          headerPart?.body?.from?.[0] ||
          '(unknown sender)';

        const date =
          parsed.date ||
          headerPart?.body?.date?.[0] ||
          null;

        // -------- BODY ----------
        let bodyContent = '(no content)';
        if (parsed.text && parsed.text.trim()) {
          bodyContent = parsed.text.trim().slice(0, 2000);
        } else if (parsed.html) {
          bodyContent = parsed.html
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 2000);
        }

     parsedEmails.push({
          from,
          subject,
          date,
          body: bodyContent,
        });
      }

      await connection.end();

      return {
        errorCode: 0,
        message: 'Mail fetched successfully',
        result: parsedEmails,
      };
    } catch (error) {
      console.error('❌ Mail fetch error:', error);
      return {
        errorCode: 1,
        message: 'Failed to fetch mails',
        error: error.message,
      };
    }
  }

private otpExpiryTime: Record<string, { otp: string; expiry: number }> = {};

// OTP Generator
private generateStrongOTP(length: number = 6): string {
  const chars =
    'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';

  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return otp;
}

async generateOTP(email: string) {

  const otp = this.generateStrongOTP(6);

  const expiry = Date.now() + 5 * 60 * 1000;

  this.otpExpiryTime[email] = { otp, expiry };

  await this.transporter.sendMail({
    from: 'akashbhanja09@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
    html: `<p>Your OTP is: <b>${otp}</b></p>`,
  });

  return { message: 'OTP sent to email' };
}



// Verify OTP
async verifyOTP(email: string, otp: string) {
  const record = this.otpExpiryTime[email];
  if (!record) {
    return { isValid: false, message: 'Invalid OTP' };
  }

  if (Date.now() > record.expiry) {
    delete this.otpExpiryTime[email];
    return { isValid: false, message: 'OTP has expired' };
  }

  if (record.otp === otp) {
    delete this.otpExpiryTime[email];
    return { isValid: true, message: 'OTP is valid' };
  }

  return { isValid: false, message: 'Invalid OTP' };

}
}




