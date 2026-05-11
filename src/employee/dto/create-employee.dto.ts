import { IsEmail, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  department_id?: number;

  @IsOptional()
  @IsInt()
  role_id?: number;
}