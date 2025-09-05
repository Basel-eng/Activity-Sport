import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesAuthGuard } from './guards/Roles.guard';
import { Roles } from './decorator/Roles.user.decorator';
import { UserType } from 'src/utils/enum';
import { AuthGuard } from './guards/users.guard';
import { CurrentUser } from './decorator/current.user.decorator';
import * as types from 'src/utils/types';
import express from 'express';
import { ForgotPasswordDto } from './dto/forgot-password';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtservice: JwtService,
  ) {}

  @Post('register')
  public async create(
    @Body() Dto: RegisterDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.usersService.register(Dto);

    res.cookie('access_token', 'accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() Dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = this.usersService.loginDto(Dto);

    res.cookie('access_token', 'accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return result;
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('access_token');
    return { message: 'تم تسجيل الخروج' };
  }

  @Get('verfyToken')
  getToken(@Req() req: express.Request) {
    try {
      const token = req.cookies['accessToken'];
      const payload = this.jwtservice.verify(token);
      return { username: payload.username };
    } catch (error) {
      console.log(error);
    }
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  public getcurrent(@CurrentUser() payload: types.JWTPAYLOADType) {
    return this.usersService.getCurrentuser(payload.id);
  }

  @Get()
  @UseGuards(RolesAuthGuard)
  @Roles(UserType.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // @UseGuards(AuthGuard)
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Put(':id')
  @UseGuards(RolesAuthGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  update(
    @CurrentUser() payload: types.JWTPAYLOADType,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(payload.id, body);
  }

  @Delete(':id')
  @UseGuards(RolesAuthGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: types.JWTPAYLOADType,
  ) {
    return this.usersService.remove(id, payload);
  }

  @Get('/api/users/verfy-email/:id/:verificationToken')
  public verfyEmail(
    @Param('id', ParseIntPipe) id: number,
    @Param('verificationToken') verificationToken: string,
  ) {
    return this.usersService.verfyemail(id, verificationToken);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  public forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.usersService.sendResetPassword(body.email);
  }
  @Get('reset-password/:id/:resetPasswordToken')
  public getresetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Param('resetPasswordToken') resetPasswordToken: string,
  ) {
    return this.usersService.getResetPassword(id, resetPasswordToken);
  }

  @Post('reset-password')
  public resetPassword(@Body() body: ResetPasswordDto) {
    return this.usersService.resetpassword(body);
  }
}
