import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { UserDto, UpdateUser } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor( private readonly userService: UserService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() payload: UserDto): {}{
    const userUuid = this.userService.createUser(payload);
    return { userUuid: userUuid }
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getUsers(): UserDto[] | string{
    const users: UserDto[] | string = this.userService.getAllUsers();
    return users;
  }

  @Get('/:uuid')
  @HttpCode(HttpStatus.OK)
  getUserByUuid(@Param('uuid') uuid: string): UserDto{
    const user: UserDto = this.userService.getUserByUuid(uuid);
    return user;
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updateUser(@Body() body: UpdateUser): UserDto {
    const userEdited: UserDto = this.userService.editUser(body.uuid, body.age, body.name);
    return userEdited;
  }

  @Delete('/:uuid')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('uuid') uuid: string){
    const uuidDeleted: string = this.userService.deleteUser(uuid);
    return `The user with uuid ${uuid} was deleted`;
  }

}
