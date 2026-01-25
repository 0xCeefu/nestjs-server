import { Injectable } from '@nestjs/common';
import fs from 'fs'
import path from 'path'
import Data from './data.json';

const dataFilePath = path.join(__dirname, 'data.json');
const fileData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// console.log('Loaded data:', fileData);

@Injectable()
export class DataService {
    getData(query): string {
        const { industry, country, continent, is_seeking_funding, has_mvp, name, city, state, mission_statement, description } = query

        let filteredData = fileData;

        if (industry) {
            filteredData = filteredData.filter(startup =>
                startup.industry.toLowerCase().includes(industry.toLowerCase())
            )
        }

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

        if (city) {
            filteredData = filteredData.filter(startup =>
                startup.business_address?.city?.toLowerCase().includes(city.toLowerCase())
            )
        }

        if (state) {
            filteredData = filteredData.filter(startup =>
                startup.business_address?.state?.toLowerCase().includes(state.toLowerCase())
            )
        }

        if (mission_statement) {
            filteredData = filteredData.filter(startup =>
                startup.mission_statement?.toLowerCase().includes(mission_statement.toLowerCase())
            )
        }

        if (description) {
            filteredData = filteredData.filter(startup =>
                startup.description?.toLowerCase().includes(description.toLowerCase())
            )
        }

        if (is_seeking_funding) {
            filteredData = filteredData.filter(startup =>
                startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase())
            )
        }

        if (has_mvp) {
            filteredData = filteredData.filter(startup =>
                startup.has_mvp === JSON.parse(has_mvp.toLowerCase())
            )
        }
        return filteredData;
    }

    getDataByLocationAndValue(location: string, value: string): Object {
        // Implement logic to filter data based on location and value
        const allowedFields = ['country', 'continent', 'industry', 'name', 'city', 'state', 'mission_statement', 'description']

        if (!allowedFields.includes(location)) {
            return { message: "Search field not allowed. Please use: country, continent, industry, name, city, state, mission_statement, description" }
        }

        let filteredData

        if (location === 'city' || location === 'state') {
            filteredData = fileData.filter(
                startup => startup.business_address?.[location]?.toLowerCase().includes(value.toLowerCase())
            )
        } else {
            filteredData = fileData.filter(
                startup => startup[location]?.toLowerCase().includes(value.toLowerCase())
            )
        }

        return filteredData
    }

    createData(body: any): Object {
        fileData.push(body);
        fs.writeFileSync(dataFilePath, JSON.stringify(fileData, null, 2), 'utf-8');
        return { message: 'Startup added successfully', startup: body };
    }

    updateData(id: number, body: any): Object {
        const index = fileData.findIndex(startup => startup.id === id);
        if (index === -1) {
            return { message: 'Startup not found' };
        }
        fileData[index] = { ...fileData[index], ...body };
        fs.writeFileSync(dataFilePath, JSON.stringify(fileData, null, 2), 'utf-8');
        return { message: 'Startup updated successfully', startup: fileData[index] };
    }
}
