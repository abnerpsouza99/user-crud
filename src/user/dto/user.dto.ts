import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class UserDto {
  
  @IsString()
  @IsOptional()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;
  
  @IsDate()
  @IsOptional()
  updatedAt: Date;

}

export class UpdateUser extends PickType(UserDto, ['uuid', 'username', 'age'] as const){}

export class AddUser extends PickType(UserDto, ['username', 'age'] as const){}