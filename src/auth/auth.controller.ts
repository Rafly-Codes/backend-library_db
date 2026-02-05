import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login user dan menghasilkan JWT token',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login berhasil',
    schema: {
      example: {
        message: 'Login berhasil',
        access_token: 'jwt_token_disini',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Username atau password salah',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(
      dto.username,
      dto.password,
    );
  }
}
