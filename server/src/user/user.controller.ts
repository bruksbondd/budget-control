import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @ApiTags('USER')
  @ApiResponse({status: 201, type: AuthUserResponse})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiTags('USER')
  @Get()
  findOne(@Body('email') email: string) {
    return this.userService.findOne(email);
  }
}
