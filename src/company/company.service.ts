import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.save(createCompanyDto);
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  async findOne(id: number) {
    return await this.companyRepository.findOneBy({ id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    await this.companyRepository.update(id, updateCompanyDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.companyRepository.delete(id);
  }
}
