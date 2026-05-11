import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })  
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: '123456' },
        email: { type: 'string', example: 'admin@gmail.com' },
      },
    },
  })
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }
  @Get('profile')
  @ApiQuery({ name: 'tokenId', required: true, example: 'your-jwt-token' })
  async getProfile(@Query('tokenId') tokenId: string) {
    return this.authService.getProfile(tokenId);
}
}
