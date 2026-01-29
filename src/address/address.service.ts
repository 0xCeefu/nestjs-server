import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) {}
  async create(createAddressDto: CreateAddressDto) {
    return await this.addressRepository.save(createAddressDto);
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: number) {
    return await this.addressRepository.findOneBy({ id });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    await this.addressRepository.update(id, updateAddressDto);
    return await this.addressRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.addressRepository.delete(id);
  }
}
