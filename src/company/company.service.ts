import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>, private configService: ConfigService) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.save(createCompanyDto);
  }
  
  async findAll(query: any) {
    // console.log(this.configService.get<string>('testVars.test2'));
    const page = +query.page || 1;
    const limit = +query.limit || this.configService.get<number>('DEFAULT_PAGE_SIZE', DEFAULT_PAGE_SIZE);

    return await this.companyRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
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
