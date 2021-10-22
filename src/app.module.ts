import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ]
})
export class AppModule { }
