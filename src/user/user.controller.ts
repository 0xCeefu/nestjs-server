import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RoleGuard } from 'src/auth/guards/roles/role.guard';

@Roles(Role.USER, Role.ADMIN, Role.EDITOR)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  findOne(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
