import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { User } from 'src/entity/user.entity';
import { MailSave } from 'src/entity/mailsave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,MailSave])],
  providers: [MailService],
  controllers: [MailController]
})
export class MailModule {}
