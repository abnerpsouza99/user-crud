import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { UserDto, UpdateUser, AddUser } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor( private readonly userService: UserService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() payload: AddUser): Promise<any> {
    const userUuid = this.userService.createUser(payload);
    return { userUuid: await userUuid }
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserDto[] | string>{
    const users: Promise<User[] | string> = this.userService.getAllUsers();
    return users;
  }

  @Get('/:uuid')
  @HttpCode(HttpStatus.OK)
  async getUserByUuid(@Param('uuid') uuid: string): Promise<User>{
    const user: Promise<User> = this.userService.getUserByUuid(uuid);
    return user;
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() body: UpdateUser): Promise<User> {
    const userEdited: Promise<User> = this.userService.editUser(body.uuid, body.age, body.username);
    return userEdited;
  }

  @Delete('/:uuid')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('uuid') uuid: string){
    const uuidDeleted: Promise<string> = this.userService.deleteUser(uuid);
    return `The user with uuid ${uuidDeleted} was deleted`;
  }

}
