import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './entity/user.entity';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { Department } from './entity/department.entity';
import { AddressModule } from './address/address.module';
import { Country } from './address/entity/country.entity';
import { State } from './address/entity/state.entity';
import { District } from './address/entity/district.entity';
import { PoliceStation } from './address/entity/police.entity';   
import { Post } from './address/entity/post.entity';
import { Role } from './entity/role.entity';
import { MailSave } from './entity/mailsave.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'management',
      entities: [Country, State, District, PoliceStation, Post, Department, Role, User, MailSave ],
      synchronize: true, // ❗ Use false in production
    }),

    AuthModule,

    RolesModule,

    UsersModule,

    MailModule,

    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
