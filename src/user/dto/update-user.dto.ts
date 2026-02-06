import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // @IsEnum(['admin', 'user', 'editor'])
    // role: Role;
}
