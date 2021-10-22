import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor( private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() payload: UserDto): Promise<string>{
    const userUuid = this.userService.createUser(payload);
    return userUuid;
  }

}
