import { Injectable } from '@nestjs/common';
import { CreateFounderDto } from './dto/create-founder.dto';
import { UpdateFounderDto } from './dto/update-founder.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Founder } from './entities/founder.entity';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FoundersService {
  constructor(@InjectRepository(Founder) private founderRepository: Repository<Founder>, private readonly configService: ConfigService) {}
  async create(createFounderDto: CreateFounderDto) {
    return await this.founderRepository.save(createFounderDto);
  }

  async findAll(query: any) {
    const page = +query.page || 1;
    const limit = +query.limit || this.configService.get<number>('DEFAULT_PAGE_SIZE') || DEFAULT_PAGE_SIZE;

    return await this.founderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.founderRepository.findOneBy({ id });
  }

  async update(id: number, updateFounderDto: UpdateFounderDto) {
    await this.founderRepository.update(id, updateFounderDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.founderRepository.delete(id);
  }
}
