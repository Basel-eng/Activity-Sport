import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SportController],
  providers: [SportService],
  imports: [UsersModule, TypeOrmModule.forFeature([Sport]), JwtModule],
})
export class SportModule {}
