import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport) private readonly repository: Repository<Sport>,
    private readonly usersservce: UsersService,
  ) {}

  public async create(Dto: CreateSportDto, userId: number) {
    try {
      const user = await this.usersservce.getCurrentuser(userId);
      const newsport = this.repository.create({
        ...Dto,
        user,
      });
      return this.repository.save(newsport);
    } catch (error) {
      console.log(error);
    }
  }

  public findAll() {
    return this.repository.find();
  }

  public async findOnesport(id: number) {
    const sport = await this.repository.findOne({ where: { id } });
    if (!sport) throw new NotFoundException('sport not fount');
    return sport;
  }

  public async update(id: number, Dto: UpdateSportDto) {
    const user = await this.findOnesport(id);
    user.username = Dto.username ?? user.username;
    user.email = Dto.email ?? user.email;
    user.history = Dto.history ?? user.history;
    user.usernumber = Dto.usernumber ?? user.usernumber;
    user.time = Dto.time ?? user.time;

    return this.repository.save(user);
  }

  public async delete(id: number) {
    const spoort = await this.findOnesport(id);
    await this.repository.remove(spoort);
    return { message: 'sport deleted successfully' };
  }
}
