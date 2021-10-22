import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsDate()
  createdAt: Date;
  
  @IsDate()
  updatedAt: Date;

}