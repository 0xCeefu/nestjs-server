import { Injectable } from '@nestjs/common';
import { CreateFounderDto } from './dto/create-founder.dto';
import { UpdateFounderDto } from './dto/update-founder.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Founder } from './entities/founder.entity';

@Injectable()
export class FoundersService {
  constructor(@InjectRepository(Founder) private founderRepository: Repository<Founder>) {}
  async create(createFounderDto: CreateFounderDto) {
    return await this.founderRepository.save(createFounderDto);
  }

  async findAll() {
    return await this.founderRepository.find();
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
