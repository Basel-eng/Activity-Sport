import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import * as types from 'src/utils/types';
import { Roles } from 'src/users/decorator/Roles.user.decorator';
import { AuthGuard } from 'src/users/guards/users.guard';
import { UserType } from 'src/utils/enum';
import { CurrentUser } from 'src/users/decorator/current.user.decorator';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('/api/sports')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Post('create')
  // @UseGuards(AuthGuard)
  // @Roles(UserType.ADMIN)
  // @ApiSecurity('bearer')
  create(
    @Body() createSportDto: CreateSportDto,
    @CurrentUser() payload: types.JWTPAYLOADType,
  ) {
    return this.sportService.create(createSportDto, payload?.id);
  }

  @Get('getActivity')
  @ApiSecurity('bearer')
  findAll() {
    return this.sportService.findAll();
  }

  @Get(':id')
  @ApiSecurity('bearer')
  findOne(id: number) {
    return this.sportService.findOnesport(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(UserType.ADMIN)
  @ApiSecurity('bearer')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSportDto: UpdateSportDto,
  ) {
    return this.sportService.update(id, updateSportDto);
  }

  @Delete(':id')
  @ApiSecurity('bearer')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sportService.delete(id);
  }
}
