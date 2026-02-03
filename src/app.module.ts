import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { FoundersModule } from './founders/founders.module';
import { TagModule } from './tag/tag.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/db.config';
import dbConfigProduction from './config/db.config.production';
import testConfig from './config/test.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    expandVariables: true,
    load: [dbConfig, testConfig, jwtConfig],
  }) ,DataModule, TypeOrmModule.forRootAsync({
    useFactory: process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
  }), CompanyModule, FoundersModule, TagModule, AddressModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
