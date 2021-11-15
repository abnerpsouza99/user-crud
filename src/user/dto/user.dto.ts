import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class UserDto {
  
  @IsString()
  @IsOptional()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  name: string;

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

export class UpdateUser extends PickType(UserDto, ['uuid', 'name', 'age'] as const){}