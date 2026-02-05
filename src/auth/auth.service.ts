import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ================= LOGIN =================
  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }

  // ================= REGISTER =================
  async register(username: string, password: string) {
    const exist = await this.prisma.user.findUnique({
      where: { username },
    });

    if (exist) {
      throw new BadRequestException('Username sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: UserRole.MEMBER, // ✅ enum prisma
      },
    });

    return {
      message: 'Register berhasil',
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }
}
