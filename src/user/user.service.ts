import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

let users: UserDto[] = [];
let user: UserDto;

@Injectable()
export class UserService { 

  constructor(){}

  createUser(payload: UserDto): string{
    let newUser = new UserDto();
    newUser.uuid = uuidv4();
    newUser.name = payload.name;
    newUser.age = payload.age;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    users.push(newUser);
    return newUser.uuid;
  }

  // getAllUsers(): UserDto[] | string { 
  //   if(users.length == 0){
  //     return 'Not exist users registered!';
  //   }else {
  //     return users;      
  //   }
  // }

  getAllUsers(): UserDto[] | string {
    return users.length > 0 ? users : 'Not exist users registered!';
  }

  getUserByUuid(uuid: string): UserDto {
    user = undefined;
    let userFinded = false;
    for(let u of users){
      if(u.uuid == uuid){
        user = u;
        userFinded = true;
      }
    }
    if(userFinded){
      return user;
    }else {
      throw new BadRequestException(`Not exists user with uuid ${uuid}`);
    }
  }

  editUser(uuid: string, age: number, name: string): any {
    user = undefined;
    let userFinded = false;
    for(let u of users){
      if(u.uuid == uuid){
        u.name = (name != undefined) || (name != '') ? name : u.name;
        u.age = age != undefined ? age : u.age;
        u.updatedAt = new Date();
        user = u;
        userFinded = true;
      }
    }
    if(userFinded){
      return user;
    }else {
      throw new BadRequestException(`Not exists user with uuid ${uuid}`);
    }
  }

  deleteUser(uuid: string): string {
    let userFinded = false;
    for(let u of users){
      if(u.uuid == uuid){
        const index = users.indexOf(u);
        // delete users[index];
        users.splice(index, 1)
        userFinded = true;
      }
    }
    if(userFinded){
      return uuid;
    }else {
      throw new BadRequestException(`Not exists user with uuid ${uuid}`);
    }
  }
}
