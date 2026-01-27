import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}
