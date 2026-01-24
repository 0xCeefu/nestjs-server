import { Injectable } from '@nestjs/common';
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(__dirname, 'data.json');
const fileData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// console.log('Loaded data:', fileData);

@Injectable()
export class DataService {
    getData(): string {
        return fileData;
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
}
