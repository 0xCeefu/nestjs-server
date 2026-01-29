import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}
  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.save(createTagDto);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(id: number) {
    return await this.tagRepository.findOneBy({ id });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.tagRepository.update(id, updateTagDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.tagRepository.delete(id);
  }
}
