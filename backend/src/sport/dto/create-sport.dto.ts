import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateSportDto {
  @IsString()
  @IsNotEmpty()
  typeActivity;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNumber()
  @IsNotEmpty()
  usernumber: number;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsDateString()
  @IsNotEmpty()
  history: Date;
  @IsDateString()
  @IsNotEmpty()
  time: string;
}
