import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FoundersService } from './founders.service';
import { CreateFounderDto } from './dto/create-founder.dto';
import { UpdateFounderDto } from './dto/update-founder.dto';

@Controller('founders')
export class FoundersController {
  constructor(private readonly foundersService: FoundersService) {}

  @Post()
  create(@Body() createFounderDto: CreateFounderDto) {
    return this.foundersService.create(createFounderDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.foundersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foundersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFounderDto: UpdateFounderDto) {
    return this.foundersService.update(+id, updateFounderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foundersService.remove(+id);
  }
}
