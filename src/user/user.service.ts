import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService { 

  constructor(){}
  
  idGenerate: number;

  async createUser(payload: UserDto): Promise<string>{
    let newUser = new UserDto();
    newUser.uuid = uuidv4();
    newUser.name = payload.name;
    newUser.age = payload.age;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    return newUser.uuid;
  }


}
