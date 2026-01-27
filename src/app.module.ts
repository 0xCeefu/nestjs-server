import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DataModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db.bmadzqvwsftartxourtn.supabase.co',
    port: 5432,
    username: 'postgres',
    password: '1H7W0kbgS6BZeP0c',
    database: 'postgres',
    // url: 'postgresql://neondb_owner:npg_t3WNXGzguE4l@ep-shiny-water-ah6r52pe-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: ['error', 'warn'],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
