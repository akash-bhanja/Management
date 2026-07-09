import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { User } from 'src/entity/user.entity';
import { MailSave } from 'src/entity/mailsave.entity';
import { Department } from 'src/entity/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,MailSave,Department])],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailModule, MailService], // <-- Export MailService
})
export class MailModule {}
