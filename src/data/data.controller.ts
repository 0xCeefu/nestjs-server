import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/createData.dto';
import { UpdateDataDto } from './dto/updateData.dto';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Get()
    findAll(@Query() query) {
        return this.dataService.getData(query);
    }

    @Get(':location/:value')
    findByLocationAndValue(@Param('location') location: string, @Param('value') value: string) {
        return this.dataService.getDataByLocationAndValue(location, value);
    }

    @Post()
    @HttpCode(201)
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, always: true, groups: ['create'] }))
    create(@Body() body: CreateDataDto) {
        return this.dataService.createData(body);
    }

    @Patch(':id')
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, always: true, groups: ['update'] }))
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDataDto) {
        // Update logic to be implemented
        return this.dataService.updateData(id, body);
    }
}
