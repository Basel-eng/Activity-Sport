import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenType, JWTPAYLOADType } from 'src/utils/types';
import { UserType } from 'src/utils/enum';
import { MailService } from 'src/mail/mail.service';
import { randomBytes } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
  ) {}

  public async register(Dto: RegisterDto) {
    const { username, email, password } = Dto;
    const user = await this.repository.findOne({ where: { email } });
    if (user) throw new BadRequestException('user acceess denied');
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    let newUser = this.repository.create({
      username,
      email,
      password: pass,
      verificationToken: randomBytes(32).toString('hex'),
    });
    const accessToken = await this.generatjwt({
      id: newUser.id,
      userType: newUser.userType,
    });

    const link = this.generatelink(newUser.id, newUser.verificationToken);
    newUser = await this.repository.save(newUser);
    await this.mailService.sendVeryfyEmailTemplate(email, link);

    return {
      accessToken,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      message:
        'Verification token has been sent to your email, please verify your email address',
    };
  }

  public async loginDto(Dto: LoginDto) {
    const { password, email } = Dto;
    const user = await this.repository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('user not found');
    const passwordnew = await bcrypt.compare(password, user.password);
    if (!passwordnew) throw new BadRequestException('invaled');

    const accessToken = await this.generatjwt({
      id: user.id,
      userType: user.userType,
    });

    if (!user.isAccountVerified) {
      let verificationToken = user.verificationToken;

      if (!verificationToken) {
        user.verificationToken = randomBytes(32).toString('hex');
        const result = await this.repository.save(user);
        verificationToken === result.verificationToken;
      }
      const link = this.generatelink(user.id, verificationToken);
      await this.mailService.sendVeryfyEmailTemplate(email, link);

      return {
        accessToken,
        user: {
          id: user.id,
          user: user.username,
          email: user.email,
        },
        message:
          'Verification token has been sent to your email, please verify your email address',
      };
    }

    
    await this.mailService.sendLogInEmail(user.email);

    return { accessToken };
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  public async update(id: number, Dto: UpdateUserDto) {
    const { username, password } = Dto;
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('');
    user.username = username ?? user.username;
    if (password) {
      user.password = await this.hashpassword(password);
    }
    return this.repository.save(user);
  }

  public async remove(userId: number, payload: JWTPAYLOADType) {
    const user = await this.getCurrentuser(userId);
    if (!user) throw new BadRequestException('');
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      if (user.id === payload?.id || payload.userType === UserType.ADMIN) {
        await this.repository.remove(user);
        return { message: 'User has been deleted' };
      }
    } catch (error) {
      console.log(error);
    }

    throw new ForbiddenException('access denied, you are not allowed');
  }

  public async getCurrentuser(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  public async hashpassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  private async generatjwt(payload: JWTPAYLOADType) {
    return await this.jwtService.signAsync(payload);
  }

  public async verfyemail(userId: number, verificationToken: string) {
    const user = await this.getCurrentuser(userId);
    if (user.verificationToken === null)
      throw new NotFoundException('user not found');
    if (user.verificationToken !== verificationToken)
      throw new BadRequestException('Invalid link');

    user.isAccountVerified = true;
    user.verificationToken = '';

    await this.repository.save(user);
    return { message: 'emailhas been verfied' };
  }

  private generatelink(userId: number, verificationToken: string) {
    return `${this.config.get<string>('DOMAIN')}/api/users/verfy-email/${userId}/${verificationToken}`;
  }

  public async sendResetPassword(email: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user)
      throw new BadRequestException('user with given email does not exist ');

    user.resetPasswordToken = randomBytes(32).toString('hex');
    const result = await this.repository.save(user);

    const resetPasswordLink = `http://localhost:3000/reset-password/${user.id}/${result.resetPasswordToken}`;
    await this.mailService.sendVeryfyEmailTemplate(email, resetPasswordLink);

    return { message: 'password reset link sent to your email ' };
  }

  public async getResetPassword(userId: number, resetPasswordToken: string) {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('invalid link');
    if (
      user.resetPasswordToken === null ||
      user.resetPasswordToken !== resetPasswordToken
    )
      throw new BadRequestException('invalid link');

    return { message: 'invalid link' };
  }
  public async resetpassword(dto: ResetPasswordDto) {
    const { userId, newPassword, resetPasswordToken } = dto;
    const user = await this.repository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('invalid link');
    if (
      user.resetPasswordToken === null ||
      user.resetPasswordToken !== resetPasswordToken
    )
      throw new BadRequestException('invalid link');

    const hashpass = await this.hashpassword(newPassword);
    user.password = hashpass;
    await this.repository.save(user);

    return { message: 'password reset login' };
  }
}
