import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from 'src/user/response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

 
  @ApiTags('AUTH')
  @ApiResponse({status: 200, type: AuthUserResponse})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AuthUserResponse> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
