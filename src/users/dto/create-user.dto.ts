import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  role_id: number;

}