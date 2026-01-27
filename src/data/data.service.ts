import { Injectable, NotFoundException } from '@nestjs/common';
import fs from 'fs'
import path from 'path'
import Data from './data.json';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDataDto } from './dto/createData.dto';
import { UpdateDataDto } from './dto/updateData.dto';

const dataFilePath = path.join(__dirname, 'data.json');
const fileData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// console.log('Loaded data:', fileData);

@Injectable()
export class DataService {
    constructor(@InjectRepository(Property) private property: Repository<Property>) {}
    async getData(query): Promise<Object> {
        const { country, continent, is_seeking_funding, name } = query

        let filteredData = await this.property.find();

        if (country) {
            filteredData = filteredData.filter(startup =>
                startup.country.toLowerCase().includes(country.toLowerCase())
            )
        }

        if (continent) {
            filteredData = filteredData.filter(startup =>
                startup.continent.toLowerCase().includes(continent.toLowerCase())
            )
        }

        if (name) {
            filteredData = filteredData.filter(startup =>
                startup.name?.toLowerCase().includes(name.toLowerCase())
            )
        }

        if (is_seeking_funding) {
            filteredData = filteredData.filter(startup =>
                startup.isSeekingFunding === JSON.parse(is_seeking_funding.toLowerCase())
            )
        }

        return filteredData;
    }

    async getDataForOne(id: number): Promise<Object> {
        const startup = await this.property.findOneBy({ id });
        if (!startup) {
            throw new NotFoundException(`Startup with ID ${id} not found`);
        }
        return startup;
    }

    async createData(body: CreateDataDto): Promise<Object> {
        return await this.property.save(body);
    }

    async updateData(id: number, body: UpdateDataDto) {
        return await this.property.update(id, body);
    }

    async removeData(id: number) {
        return await this.property.delete(id);
    }
}
