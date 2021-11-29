import { BadRequestException, Injectable } from '@nestjs/common';
import { AddUser, UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

let users: UserDto[] = [];
let user: UserDto;

@Injectable()
export class UserService { 

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async createUser(payload: AddUser): Promise<string>{
    let newUser = this.usersRepository.create();
    newUser.username = payload.username;
    newUser.age = payload.age;
    newUser = await this.usersRepository.save(newUser);
    console.log(`newUser.uuid`, newUser.uuid);
    return newUser.uuid;
  }

  // getAllUsers(): UserDto[] | string { 
  //   if(users.length == 0){
  //     return 'Not exist users registered!';
  //   }else {
  //     return users;      
  //   }
  // }

  async getAllUsers(): Promise<User[] | string> {
    const users = await this.usersRepository.find();
    return users.length > 0 ? users : 'Not exist users registered!';
  }

  async getUserByUuid(uuid: string): Promise<User> {
    let user = await this.usersRepository.findOne(uuid, {
      where: {
        uuid: uuid
      }
    });
    if(user && user != undefined){
      return user;
    }else {
      throw new BadRequestException(`Not exists user with uuid ${uuid}`);
    }
  }

  async editUser(uuid: string, age: number, name: string): Promise<any> {
    let user = await this.usersRepository.findOne(uuid, {
      where: {
        uuid: uuid
      }
    })
    if(user){
      return await this.usersRepository.update(uuid, {
        username: name,
        age: age,
        updatedAt: new Date()
      });
    }else {
      throw new BadRequestException(`Not exists user with uuid ${uuid}`);
    }
  }

  async deleteUser(uuid: string): Promise<string> {
    let user = await this.usersRepository.findOne(uuid, {
      where: {
        uuid: uuid
      }
    });
    if(user){
      await this.usersRepository.softDelete(uuid);
      return uuid;
    }else {
      throw new BadRequestException(`Not exists user with uuid ${uuid}`);
    }
  }
}
