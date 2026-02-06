import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly configService: ConfigService) {}

  async create(createUserDto: CreateUserDto) {
    let existingUser = await this.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    let user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async setCurrentRefreshToken(userId: number, refreshToken) {
    return await this.userRepository.update(userId, { hashedRefreshToken: refreshToken });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findAll(query: any) {
    let skip = +query.page || 1;
    const limit = +query.limit || this.configService.get<number>('DEFAULT_PAGE_SIZE', DEFAULT_PAGE_SIZE);

    return await this.userRepository.find({
      skip: (skip - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id }, select: ['id', 'name', 'email', 'role'] });
  }

  async findOneBy(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
