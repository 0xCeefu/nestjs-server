import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Get()
    findAll() {
        return this.dataService.getData();
    }

    @Get(':location/:value')
    findByLocationAndValue(@Param('location') location: string, @Param('value') value: string) {
        return this.dataService.getDataByLocationAndValue(location, value);
    }

    @Post()
    @HttpCode(201)
    create(@Body() body) {
        return this.dataService.createData(body);
    }
}
